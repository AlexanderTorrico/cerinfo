<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $listaAutor = Author::all();
            return response()->json([
                "res" => "success",
                "data" => $listaAutor
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los Autores"
            ], 500);
        }
    }

    public function autorIndex()
    {
        try {
            $listaAutor = Author::all();
            return response()->json([
                "res" => "success",
                "data" => $listaAutor
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los Autores"
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
            'country' => 'required',
            'city' => 'required',
            'date_birth' => 'required'

        ]);
        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }
        try {
            $objAutor = new Author();
            $objAutor->fill($request->json()->all());
            $objAutor->save();
            return response()->json([
                "res" => "success",
                "data" => $objAutor
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Autor"
            ], 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $objAutor = Author::findOrFail($id);
            if ($objAutor == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Autor no encontrado"
                ], 404);
            }
            return response()->json([
                "res" => "success",
                "data" => $objAutor
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener el Autor"
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function edit(Author $author)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required',
            'country' => 'required',
            'city' => 'required',
            'date_birth' => 'required'

        ]);
        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }
        try {
            $objAutor = Author::findOrFail($id);
            if ($objAutor == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Autor no encontrado"
                ], 404);
            }
            $objAutor->fill($request->json()->all());
            $objAutor->save();
            return response()->json([
                "res" => "success",
                "data" => $objAutor
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Autor"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function destroy($id)
    {

        try {
            $author = Author::find($id);
            $author->delete();
            $info = ['nombre' => 'Rafael'];
            return response()->json($info,204);
        } catch (\Exception $e) {
            $info = ['estado' => 'error'];
            return response()->json($info,501);
        }
    }
}
