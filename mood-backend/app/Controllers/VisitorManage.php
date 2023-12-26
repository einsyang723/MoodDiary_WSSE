<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\MembersModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class VisitorManage extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        return $this->respond([
            "status" => true,
            "data"   => "Welcome visitor",
            "msg"    => "Welcome visitor"
        ]);
    }

    public function renderRegisterPage()
    {
        return $this->respond([
            "status" => true,
            "data"   => "Welcome register",
            "msg"    => "Welcome register"
        ]);
    }

    public function renderLoginPage()
    {
        return $this->respond([
            "status" => true,
            "data"   => "Welcome login",
            "msg"    => "Welcome login"
        ]);
    }

    public function login()
    {
        $data = $this->request->getPost();

        $account    = $data['account'] ?? null;
        $password   = $data['password'] ?? null;

        if($account === null || $password === null) {
            return $this->fail("需帳號密碼進行登入", 404);
        }

        if($account === " " || $password === " ") {
            return $this->fail("需帳號密碼進行登入", 404);
        }

        $membersModel = new MembersModel();
        $memberData  = $membersModel->where("m_account", $account)->first();

        if($memberData === null) {
            return $this->fail("查無此帳號", 403);
        }

        if(password_verify($password, $memberData['m_password'])) {
            $key = getenv('JWT_SECRET');
            $payload = array(
                'm_id'      => $memberData['m_id'],
                'm_account' => $memberData['m_account'],
                'm_name' => $memberData['m_name']
            );
            $token = JWT::encode($payload, $key, 'HS256');
            return $this->respond([
                "status" => true,
                "data"   => $token,
                "msg"    => "Welcome our member"
            ]);
        } else {
            return $this->fail("帳號密碼錯誤", 403);
        }
    }

    public function register()
    {
        $data = $this->request->getPost();

        $account    = $data['account'] ?? null;
        $password   = $data['password'] ?? null;
        $repassword = $data['repassword'] ?? null;
        $name    = $data['name'] ?? null;

        if($account === null || $password === null || $repassword === null || $name === null) {
            return $this->fail("需帳號密碼進行註冊", 404);
        }

        if($account === " " || $password === " " || $repassword === " " || $name === " ") {
            return $this->fail("需帳號密碼進行註冊", 404);
        }

        if($password != $repassword) {
            return $this->fail("密碼驗證錯誤", 403);
        }

        $membersModel = new MembersModel();
        $memberData  = $membersModel->where("m_account", $account)->first();

        if($memberData != null) {
            return $this->fail("帳號已被註冊", 403);
        }

        $values = [
            'm_account'  => $account,
            'm_password' => password_hash($password, PASSWORD_DEFAULT),
            'm_name'     => $name
        ];
        $membersModel->insert($values);

        return $this->respond([
            "status" => true,
            "data"   => "Welcome new member",
            "msg"    => "Welcome new member"
        ]);
    }

    public function reset()
    {
        $data = $this->request->getPost();

        $account    = $data['account'] ?? null;

        $membersModel = new MembersModel();
        $verifyUserData = $membersModel->where("m_account", $account)->first();

        if($verifyUserData === null) {
            return $this->fail("查無此帳號", 404);
        }

        $updateValues = [
            'm_password' =>  password_hash($verifyUserData['m_name'].'123456', PASSWORD_DEFAULT),
        ];
        $membersModel->update($verifyUserData['m_id'], $updateValues);

        return $this->respond([
            "status" => true,
            "data"   => "個人資料修改成功",
            "msg"    => "個人資料修改成功"
        ]);
    }
}
