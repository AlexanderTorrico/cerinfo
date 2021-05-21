<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/json'
            ])->post('http://sisnur.nur.edu:8085/api/Biblio/GetAlumnoInfoByLogin', [
                'username' => $request->username,
                'password' => $request->password,
            ]);
            $register="";
            if(strlen($request->username)==6){
                $register = "0".$request->username;
            }else{
                $register = $request->username;
            }
            if($response->json('Data')==null){
                return response()->json([
                    "res" => "warning",
                    "message" => "Sin datos"
                ], 500);
            }else{
                if(Client::where('register', '=', $register)->exists()){
                    $obj = new Client([
                        'name' => $response->json('Data.SNOMBRES'),
                        'last_name' => $response->json('Data.SAPELLIDOP'),
                        'mother_last_name' => $response->json('Data.SAPELLIDOM'),
                        'register' => $response->json('Data.SREGISTRO'),
                        'phone' => $response->json('Data.SCELULAR'),
                    ]);
                }else{
                    $obj = Client::create([
                        'name' => $response->json('Data.SNOMBRES'),
                        'last_name' => $response->json('Data.SAPELLIDOP'),
                        'mother_last_name' => $response->json('Data.SAPELLIDOM'),
                        'register' => $response->json('Data.SREGISTRO'),
                        'phone' => $response->json('Data.SCELULAR'),
                    ]);
                }
                return $obj;
            }
        } catch (\Exception $e){
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Sin datos"
            ], 500);
        }
    }

    public  function active_loans($id){
        try {
            if(strlen($id)==6){
                $id = "0".$id;
            }
            $client = Client::where("register", $id)->get();
            $id = $client->first();
            $client = json_decode($client, true);

            //$listActive_Loans = Client::findOrFail($id["id"])->loans;
            $listActive_Loans = Loan::join('books', 'books.id','=','loans.book_id')
                ->where('loans.client_id','=',$id["id"])
                ->where('loans.active','=',true)
                ->get();
            return response()->json([
                "res" => "success",
                "data" => [
                    "client" => $client,
                    "loans" => $listActive_Loans
                ]
            ]);
        }catch (\Exception $e){
            return response()->json([
                "res" => "error",
                "message" => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        //
    }
}
