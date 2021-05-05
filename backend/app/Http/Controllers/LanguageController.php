<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LanguageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $listaLenguage = Language::all();
            return response()->json([
                "res" => "success",
                "data" => $listaLenguage
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los Lenguajes"
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
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required',
            'abbreviation' =>'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }
        try {
            $objLenguage = new Language();
            $objLenguage->fill($request->json()->all());
            $objLenguage->save();
            return response()->json([
                "res" => "success",
                "data" => $objLenguage
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Lenguaje"
            ], 500);
        }




    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Language  $language
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $objLenguage = Language::findOrFail($id);
            if ($objLenguage == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Lenguaje no encontrado"
                ], 404);
            }
            return response()->json([
                "res" => "success",
                "data" => $objLenguage
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener el Lenguaje"
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Language  $language
     * @return \Illuminate\Http\Response
     */
    public function edit(Language $language)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Language  $language
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required',
            'abbreviation' =>'required'

        ]);
        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }
        try {
            $objLenguage = Language::findOrFail($id);
            if ($objLenguage == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Lenguaje no encontrado"
                ], 404);
            }
            $objLenguage->fill($request->json()->all());
            $objLenguage->save();
            return response()->json([
                "res" => "success",
                "data" => $objLenguage
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Lenguaje"
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Language  $language
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        try {
            $language = Language::find($id);
            $language->delete();
            $info = ['nombre' => 'Rafael'];
            return response()->json($info,204);
        } catch (\Exception $e) {
            $info = ['estado' => 'error'];
            return response()->json($info,501);
        }
    }
}
