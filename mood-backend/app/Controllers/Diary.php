<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\DiarysModel;

class Diary extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $m_id = session()->get("memberdata")->m_id;

        $diarysModel = new DiarysModel();
        $returnData['diaryData'] = $diarysModel->where('m_id', $m_id)
                                            ->orderBy('d_date','DESC')
                                            ->limit(5)
                                            ->findAll();
        
        if($returnData['diaryData'] === null || empty($returnData['diaryData'])) {
            return $this->fail("查無日記", 404);
        }

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function addDiary()
    {
        $m_id = session()->get("memberdata")->m_id;

        $data = $this->request->getPost();

        $d_date     = $data['date'] ?? null;
        $d_feeling  = $data['feeling'] ?? null;
        $d_mood     = $data['mood'] ?? null;
        $d_social   = $data['social'] ?? null;
        $d_hobby    = $data['hobby'] ?? null;
        $d_sleep    = $data['mood'] ?? null;
        $d_food     = $data['food'] ?? null;
        $d_activity = $data['activity'] ?? null;

        if($d_date === null || $d_feeling === null || $d_mood === null) {
            return $this->fail("需日期及情緒進行紀錄", 404);
        }

        if($d_date === " " || $d_feeling === " " || $d_mood === " ") {
            return $this->fail("需日期及情緒進行紀錄", 404);
        }

        $diarysModel = new DiarysModel();
        $verifyDiaryData = $diarysModel->where('m_id', $m_id)
                                        ->where('d_date',$d_date)
                                        ->first();

        if($verifyDiaryData != null) {
            return $this->fail("日記已填寫，請至更新日記處修改日記", 403);
        }

        $values = [
            'd_date'     => $d_date,
            'd_feeling'  => $d_feeling,
            'd_mood'     => $d_mood,
            'd_social'   => $d_social,
            'd_hobby'    => $d_hobby,
            'd_sleep'    => $d_sleep,
            'd_food'     => $d_food,
            'd_activity' => $d_activity,
        ];
        $diarysModel->insert($values);

        return $this->respond([
            "status" => true,
            "data"   => "日記記錄成功",
            "msg"    => "日記記錄成功"
        ]);
    }

    public function perDiary($d_id)
    {
        $m_id = session()->get("memberdata")->m_id;

        $diarysModel = new DiarysModel();
        $returnData['diaryData'] = $diarysModel->where('d_id', $d_id)->first();
        
        if($returnData['diaryData'] === null || empty($returnData['diaryData'])) {
            return $this->fail("查無日記", 404);
        }

        if($returnData['diaryData']['m_id'] != $m_id) {
            return $this->fail("沒有察看此日記的權限", 404);
        }

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }
}
