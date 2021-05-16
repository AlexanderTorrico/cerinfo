<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function registerAdministrator(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'

        ]);
        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }

        try{
        $objUser = new User();
        $objUser->name = $request->get('name');
        $objUser->email = $request->get('email');
        $objUser->password = bcrypt($request->get('password'));
        $objUser->save();
        $objUser->assignRole('Administrator');
        return response()->json([
            "res" => "success",
            "data" => $objUser
        ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error guardar al nuevo usuario"
            ], 500);
        }

    }
    public function registerAssistant(Request $request)
    {
        $objUser = new User();
        $objUser->name = $request->get('name');
        $objUser->email = $request->get('email');
        $objUser->password = bcrypt($request->get('password'));
        $objUser->save();
        $objUser->assignRole('Assistant');
        return response()->json([
            "res" => "success",
            "data" => $objUser
        ]);
    }

    public function registerMaster(Request $request)
    {
        $objUser = new User();
        $objUser->name = $request->get('name');
        $objUser->email = $request->get('email');
        $objUser->password = bcrypt($request->get('password'));
        $objUser->save();
        $objUser->assignRole('Master');
        return response()->json([
            "res" => "success",
            "data" => $objUser
        ]);
    }

    public function registerStudent(Request $request)
    {
        $objUser = new User();
        $objUser->name = $request->get('name');
        $objUser->email = $request->get('email');
        $objUser->password = bcrypt($request->get('password'));
        $objUser->save();
        $objUser->assignRole('Student');
        return response()->json([
            "res" => "success",
            "data" => $objUser
        ]);
    }

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $tokenResult = $user->createToken('Personal Access Token');
//            $token = $tokenResult->token;
            return response()->json([
                "res" => "success",
                'access_token' => $tokenResult->accessToken,
                'user'=>auth()->user()
            ]);
        }
        return response()->json(
            ['res' => 'error',
                'message' => 'Unauthorized'
            ], 401
        );
        //access-token : generado
        //eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWI5Y2JjZjM0Nzk0NjEzNWY2Njg4NDY4MGZmNTA1Y2Y2YTNjMmMzZTdhNzc3YjU4M2ZhZDgxZTI5YWNjMDM4MGIwNjE0ZjIyYzg3Njc3MTYiLCJpYXQiOiIxNjE0MDA1ODY4Ljc4NjIzMSIsIm5iZiI6IjE2MTQwMDU4NjguNzg2MjM1IiwiZXhwIjoiMTY0NTU0MTg2OC43MzcwNTEiLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.eHieHMRygVG0O6dq7e30HzH7U-zA3VwxmvkmKTxOT03kql3CmtY_YehrxpsAW1uxFpaLharh_ZyP02tAaXnTU1uVY0oTOqxgXeVTrma04X8_gUSros1yhPReF8liNb_OiApV3T0p75C-jqcisFIkw3YUtgYhECupr0Cwy_RFMw_YT9_CayWnmK8a6U-K6NWDgAYVsVcQIc9F3h3Hi3EKKJjabKQy8OFTdbOB3cdgRg592lMUnLMwy5xsX34eTPdmSF_bR-CQKGR_seS0X-YmHvVwt6d5PpaaD0VzCT103f638-2qRs_n6vCw3Gi2qozGSzgEMGhmAhwe4OpFIKcUjOtjvDisCnCwNL8NAwyWLa9cfcSwz7_gIfWIhFyS2VDe1QPWmY14kYM4T9NClK9rWZrKfLtyj2uCu711Ih1RBxNg41NSSkncwfjzSS9Aid4AiDGLhos4aM6-RCcCtppz62Ib6QJ8f5SYSz54r4JtnoVeWF1FgtjmkTUQndykhBsgvFKAXFD8MTK5JW8kYzyrNUVy_yNz7dxq4XppkWDds-0MvN71fPrKJlks4waNE-vistzfPjyWID-Kjko3ZvqRfWcHz5cAxv0SgY8CmyUIAz5xv3ExyUNxa9VB8j4qLWYl3pIIwi88D38yAwN0GkceDdjhjhJLbYGX1b8gPMaYkH8

    }
}
