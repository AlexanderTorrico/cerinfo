<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $listaMaterial = Material::all();
            return response()->json([
                "res" => "success",
                "data" => $listaMaterial
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los materiales"
            ], 500);
        }
    }

    public function materialIndex()
    {
        try {
            $listaMaterial = Material::all();
            return response()->json([
                "res" => "success",
                "data" => $listaMaterial
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los materiales"
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
            $objMaterial = new Material();
            $objMaterial->fill($request->json()->all());
            $objMaterial->save();
            return response()->json([
                "res" => "success",
                "data" => $objMaterial
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Material"
            ], 500);
        }


//        $obj = Material::create([
//            'name' => $request->name
//
//        ]);
//        return response()->json($obj, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Material  $material
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $objMaterial = Material::findOrFail($id);
            if ($objMaterial == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Material no encontrado"
                ], 404);
            }
            return response()->json([
                "res" => "success",
                "data" => $objMaterial
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener el Material"
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Material  $material
     * @return \Illuminate\Http\Response
     */
    public function edit(Material $material)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Material  $material
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id )
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
            $objMaterial = Material::findOrFail($id);
            if ($objMaterial == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Material no encontrado"
                ], 404);
            }
            $objMaterial->fill($request->json()->all());
            $objMaterial->save();
            return response()->json([
                "res" => "success",
                "data" => $objMaterial
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Material"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Material  $material
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $material = Material::find($id);
            $material->delete();
            $info = ['nombre' => 'Rafael'];
            return response()->json($info,204);
        } catch (\Exception $e) {
            $info = ['estado' => 'error'];
            return response()->json($info,501);
        }
    }
}
