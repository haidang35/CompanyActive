<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function manageDocuments() {
        $documents = Document::all();
        return view("admin.document.manage_document", [
            "documents" => $documents
        ]);
    }

    public function uploadDocument(Request $request) {
        try {
            $file_document = $request->file("file_document");
            if($file_document) {
                $file_name = time().$file_document->getClientOriginalName();
                $file_extension = $file_document->getClientOriginalExtension();
                $file_document->move("upload/documents", $file_name);
                Document::create([
                    "document_name" => $file_name
                ]);
                Session::put("message_success", "Add new document success !!");
                return Redirect::to("admin/documents");
            }
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function viewDocument($document_id) {
        $document = Document::findOrFail($document_id);
        return response()->file("upload/documents/".$document->document_name, [
            "Content-Type" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]);
    }


}
