<?php

namespace App\Http\Controllers;

use App\Models\Gender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class GenderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $listaGenero = Gender::all();
            return response()->json([
                "res" => "success",
                "data" => $listaGenero
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los Generos"
            ], 500);
        }
    }




    public function genderIndex()
    {
        try {
            $listaGenero = Gender::all();
            return response()->json([
                "res" => "success",
                "data" => $listaGenero
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los Generos"
            ], 500);
        }
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->json()->all(), [
            'name' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }
        try {
            $objGenero = new Gender();
            $objGenero->fill($request->json()->all());
            $objGenero->save();
            return response()->json([
                "res" => "success",
                "data" => $objGenero
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Genero"
            ], 500);
        }



    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Gender  $gender
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $objGenero = Gender::findOrFail($id);
            if ($objGenero == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Genero no encontrado"
                ], 404);
            }
            return response()->json([
                "res" => "success",
                "data" => $objGenero
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener el Genero"
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Gender  $gender
     * @return \Illuminate\Http\Response
     */
    public function edit(Gender $gender)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Gender  $gender
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->json()->all(), [
            'name' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }
        try {
            $objGenero = Gender::findOrFail($id);
            if ($objGenero == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Genero no encontrado"
                ], 404);
            }
            $objGenero->fill($request->json()->all());
            $objGenero->save();
            return response()->json([
                "res" => "success",
                "data" => $objGenero
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Genero"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Gender  $gender
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $gender = Gender::find($id);
            $gender->delete();
            $info = ['nombre' => 'Rafael'];
            return response()->json($info,204);
        } catch (\Exception $e) {
            $info = ['estado' => 'error'];
            return response()->json($info,501);
        }
    }
}
