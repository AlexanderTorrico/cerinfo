<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller
{
    public function index()
    {
        try {
            $listaCategoria = Categories::all();
            return response()->json([
                "res" => "success",
                "data" => $listaCategoria
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los Categoria"
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
            $objCategoria = new Categories();
            $objCategoria->fill($request->json()->all());
            $objCategoria->save();
            return response()->json([
                "res" => "success",
                "data" => $objCategoria
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Categoria"
            ], 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categorys  $categorys
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $objCategoria = Categories::findOrFail($id);
            if ($objCategoria == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Categoria no encontrado"
                ], 404);
            }
            return response()->json([
                "res" => "success",
                "data" => $objCategoria
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener el Categoria"
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categorys  $categorys
     * @return \Illuminate\Http\Response
     */
    public function edit(Categories $categorys)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categorys  $categorys
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
            $objCategoria = Categories::findOrFail($id);
            if ($objCategoria == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Categoria no encontrado"
                ], 404);
            }
            $objCategoria->fill($request->json()->all());
            $objCategoria->save();
            return response()->json([
                "res" => "success",
                "data" => $objCategoria
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Categoria"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categorys  $categorys
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $language = Categories::find($id);
            $language->delete();
            $info = ['nombre' => 'Rafael'];
            return response()->json($info,204);
        } catch (\Exception $e) {
            $info = ['estado' => 'error'];
            return response()->json($info,501);
        }
    }
}
