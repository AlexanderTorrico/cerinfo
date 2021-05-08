<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $listaLibros = Book::with('author','language','gender','material')->get();
            return response()->json([
                "res" => "success",
                "data" => $listaLibros
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los Libros"
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
            'title' => 'required',
            'detail' => 'required',
            'sigTop' => 'required',
            'dewey' => 'required',
            'cuter' => 'required',
            'available'=> 'required',
            'show' => 'required',
            'author_id' => 'required',
            'gender_id' => 'required',
            'language_id' => 'required',
            'material_id'=> 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }
        try {
            $objLibro = new Book();
            $objLibro->fill($request->json()->all());
            $objLibro->save();
            return response()->json([
                "res" => "success",
                "data" => $objLibro
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Libro"
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $objLibro = Book::findOrFail($id);
            if ($objLibro == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "El Libro no encontrado"
                ], 404);
            }
            return response()->json([
                "res" => "success",
                "data" => $objLibro
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener el Libro"
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->json()->all(), [
            'title' => 'required',
            'detail' => 'required',
            'sigTop' => 'required',
            'dewey' => 'required',
            'cuter' => 'required',
            'available'=> 'required',
            'show' => 'required',
            'author_id' => 'required',
            'gender_id' => 'required',
            'language_id' => 'required',
            'material_id'=> 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }
        try {
            $objLibro = Book::findOrFail($id);
            if ($objLibro == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Libro no encontrado"
                ], 404);
            }
            $objLibro->fill($request->json()->all());
            $objLibro->save();
            return response()->json([
                "res" => "success",
                "data" => $objLibro
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Libro"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $objLibro = Book::find($id);
            $objLibro->delete();
            $info = ['nombre' => 'Rafael'];
            return response()->json($info,204);
        } catch (\Exception $e) {
            $info = ['estado' => 'error'];
            return response()->json($info,501);
        }
    }
}
