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
        $d_sleep    = $data['sleep'] ?? null;
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
            'm_id'       => $m_id,
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

    public function updateDiary($id)
    {
        $m_id = session()->get("memberdata")->m_id;

        $data = $this->request->getJSON(true);

        $diarysModel = new DiarysModel();
        $verifyDiaryData = $diarysModel->where("d_id", $id)->first();

        if($verifyDiaryData === null || empty($verifyDiaryData)) {
            return $this->fail("查無此日記", 404);
        }

        if($verifyDiaryData['m_id'] != $m_id) {
            return $this->fail("沒有修改此日記的權限", 404);
        }

        $d_feeling  = $data['feeling'] ?? null;
        $d_mood     = $data['mood'] ?? null;
        $d_social   = $data['social'] ?? null;
        $d_hobby    = $data['hobby'] ?? null;
        $d_sleep    = $data['sleep'] ?? null;
        $d_food     = $data['food'] ?? null;
        $d_activity = $data['activity'] ?? null;

        if($d_feeling === null || $d_mood === null) {
            return $this->fail("需要情緒進行紀錄", 404);
        }

        if($d_feeling === " " || $d_mood === " ") {
            return $this->fail("需要情緒進行紀錄", 404);
        }
        
        if($verifyDiaryData['d_feeling'] != $d_feeling) {
            $verifyDiaryData['d_feeling'] = $d_feeling;
        }

        if($verifyDiaryData['d_mood'] != $d_mood) {
            $verifyDiaryData['d_mood'] = $d_mood;
        }

        if($verifyDiaryData['d_social'] != $d_social) {
            $verifyDiaryData['d_social'] = $d_social;
        }

        if($verifyDiaryData['d_hobby'] != $d_hobby) {
            $verifyDiaryData['d_hobby'] = $d_hobby;
        }

        if($verifyDiaryData['d_sleep'] != $d_sleep) {
            $verifyDiaryData['d_sleep'] = $d_sleep;
        }

        if($verifyDiaryData['d_food'] != $d_food) {
            $verifyDiaryData['d_food'] = $d_food;
        }

        if($verifyDiaryData['d_activity'] != $d_activity) {
            $verifyDiaryData['d_activity'] = $d_activity;
        }

        try {
            $updateValues = [
                'd_feeling'  => $verifyDiaryData['d_feeling'],
                'd_mood'     => $verifyDiaryData['d_mood'],
                'd_social'   => $verifyDiaryData['d_social'],
                'd_hobby'    => $verifyDiaryData['d_hobby'],
                'd_sleep'    => $verifyDiaryData['d_sleep'],
                'd_food'     => $verifyDiaryData['d_food'],
                'd_activity' => $verifyDiaryData['d_activity'],
            ];
            $diarysModel->update($verifyDiaryData['m_id'], $updateValues);       
        } catch (\Exception $e) {
            return $this->fail("日記沒有要修改的地方", 404);
        }

        return $this->respond([
            "status" => true,
            "msg"    => "日記修改成功"
        ]);
    }

    public function deleteDiary($id)
    {
        $m_id = session()->get("memberdata")->m_id;

        $diarysModel = new DiarysModel();
        $verifyDiaryData = $diarysModel->where("d_id", $id)->first();

        if($verifyDiaryData === null || empty($verifyDiaryData)) {
            return $this->fail("查無此日記", 404);
        }

        if($verifyDiaryData['m_id'] != $m_id) {
            return $this->fail("沒有刪除此日記的權限", 404);
        }

        $diarysModel->delete($verifyDiaryData['m_id']);

        return $this->respond([
            "status" => true,
            "msg"    => "日記刪除成功"
        ]);
    }

    public function changeMonth()
    {
        $m_id = session()->get("memberdata")->m_id;

        $data = $this->request->getPost();

        $d_date     = $data['date'] ?? null;

        $date = new \DateTime($d_date);
        $formattedDate = $date->format('Y-m');

        $diarysModel = new DiarysModel();
        $returnData['diaryData'] = $diarysModel->where('m_id', $m_id)
                                            ->where("DATE_FORMAT(d_date, '%Y-%m') = '{$formattedDate}'")
                                            ->orderBy('d_date','ASC')
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

    public function analysis()
    {
        $m_id = session()->get("memberdata")->m_id;

        $data = $this->request->getPost();

        $date_from   = $data['date_from'] ?? null;
        $date_to     = $data['date_to'] ?? null;

        $diarysModel = new DiarysModel();
        $returnData['diaryData'] = $diarysModel->select('d_date, d_feeling')
                                            ->where('m_id', $m_id)
                                            ->where("d_date BETWEEN '{$date_from}' AND '{$date_to}'")
                                            ->orderBy('d_date','ASC')
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
}
