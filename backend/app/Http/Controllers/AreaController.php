<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $listaArea = Area::all();
            return response()->json([
                "res" => "success",
                "data" => $listaArea
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de las Areas"
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
            $objArea = new Area();
            $objArea->fill($request->json()->all());
            $objArea->save();
            return response()->json([
                "res" => "success",
                "data" => $objArea
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
     * @param  \App\Models\Area  $area
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $objArea = Area::findOrFail($id);
            if ($objArea == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Area no encontrado"
                ], 404);
            }
            return response()->json([
                "res" => "success",
                "data" => $objArea
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener el Area"
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Area  $area
     * @return \Illuminate\Http\Response
     */
    public function edit(Area $area)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Area  $area
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
            $objArea = Area::findOrFail($id);
            if ($objArea == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Area no encontrado"
                ], 404);
            }
            $objArea->fill($request->json()->all());
            $objArea->save();
            return response()->json([
                "res" => "success",
                "data" => $objArea
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Area"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Area  $area
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $area = Area::find($id);
            $area->delete();
            $info = ['estado' => 'ok'];
            return response()->json($info,204);
        } catch (\Exception $e) {
            $info = ['estado' => 'error'];
            return response()->json($info,501);
        }
    }
}
