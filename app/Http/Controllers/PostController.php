<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class PostController extends Controller
{
    public function managePosts() {
        $posts = Post::all();
        return view("admin.post.posts", [
            "posts" => $posts
        ]);
    }

    public function postDetails($post_id) {
        try {
            $post = Post::findOrFail($post_id);
            return view("admin.post.post_details", [
                "post" => $post
            ]);
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function postEditor() {
        return view("admin.document.editor");
    }

    public function savePost(Request $request) {
        try {
            if($request->hasFile('upload')) {
                $originName = $request->file('upload')->getClientOriginalName();
                $fileName = pathinfo($originName, PATHINFO_FILENAME);
                $extension = $request->file('upload')->getClientOriginalExtension();
                $fileName = $fileName.'_'.time().'.'.$extension;
                $request->file('upload')->move(public_path('upload/images'), $fileName);
                $CKEditorFuncNum = $request->input('CKEditorFuncNum');
                $url = asset('upload/images/'.$fileName);
                $msg = 'Image successfully uploaded';
                $response = "<script>window.parent.CKEDITOR.tools.callFunction($CKEditorFuncNum, '$url', '$msg')</script>";
                @header('Content-type: text/html; charset=utf-8');
                dd($response);
            }
            $data = array();
            $user =  Auth::user();
            $data["post_title"] = $request->get("post_title");
            $data["post_content"] = $request->get("post_content");
            $data["post_author"] = $user->name;
            Post::create($data);
            return Redirect::to("admin/manage-posts");
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }

    }

    public function publishPost($post_id) {
        try {
            $post = Post::findOrFail($post_id);
            if($post->post_status == 0) {
                $post->update([
                    "post_status" => 1
                ]);
                Session::put("message_success", "Publish post ".'"'.$post->post_title.'"'." success!!");
            }elseif ($post->post_status == 1) {
                $post->update([
                    "post_status" => 0
                ]);
                Session::put("message_success", "Unpublished post ".'"'.$post->post_title.'"'." success!!");
            }
            return Redirect::to("admin/manage-posts");
        }catch (Exception $exception){
            dd($exception->getMessage());
        }
    }

    public function editPost($post_id) {
        try {
            $post = Post::findOrFail($post_id);
            return view("admin.post.edit_post", [
                "post" => $post
            ]);
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function updatePost($post_id, Request $request) {
        try {
            $data = array();
            $data["post_title"] = $request->get("post_title");
            $data["post_content"] = $request->get("post_content");
            $post = Post::findOrFail($post_id);
            $post->update($data);
            Session::put("message_success", "Update post ".'"'.$post->post_title.'"' ." success !!");
            return Redirect::to("admin/manage-posts");
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function deletePost($post_id) {
        try{
            $post = Post::findOrFail($post_id);
            $post->delete();
            Session::put("post_deleted", $post);
            Session::put("message_success", "Delete post".'"'.$post->post_title.'"'." success !!");
            return Redirect::to("admin/manage-posts");
        }catch (Exception $exception) {

        }
    }

    public function restorePost($post_id) {
        try {
            $post_delete = Post::withTrashed()->find($post_id);
            $post_delete->restore();
            Session::put("message_success", "Restore post ".'"'.$post_delete->post_title.'"' ." success !!");
            return Redirect::to("admin/manage-posts");
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }
}
