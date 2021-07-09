@extends("admin_layout")
@section("admin_main")
    <div class="section">
        <div class="row">
            <div class="card" >
                <div class="card-header">

                    <h4 class="card-title">Create Post</h4>
                </div>
                <div class="card-body">
                    <form id="form-editor" action="{{url("admin/posts/save-post")}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label class="auth-title">Title</label>
                            <input type="text" name="post_title" class="form-control form-control-lg" />
                        </div>
                        <div class="form-group">
                            <label class="auth-title">Content</label>
                            <textarea id="editor" class="ckeditor form-control" rows="70" name="post_content"></textarea>
                        </div>
                        <div class="buttons float-sm-end">
                            <button form="form-editor" type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>

                </div>


            </div>
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            $('.ckeditor').ckeditor();
        });
    </script>
{{--    <script>--}}
{{--        CKEDITOR.replace("editor")--}}
{{--    </script>--}}
    <script type="text/javascript">
        CKEDITOR.replace('post_content', {
            filebrowserUploadUrl: "{{route('ckeditor.image-upload', ['_token' => csrf_token() ])}}",
            filebrowserUploadMethod: 'form'
        });
    </script>

@endsection

