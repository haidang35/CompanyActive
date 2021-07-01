@extends("admin_layout")
@section("admin_main")
    <div class="section">
        <div class="row">
            <div class="card" >
                <div class="card-header">
                    <div class="buttons float-sm-end">
                        <button form="form-editor" type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    <h4 class="card-title">Document edit</h4>
                </div>
                <div class="card-body">
                    <form id="form-editor" action="{{url("admin/documents/save-editor")}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <textarea id="editor" class="ckeditor form-control" name="editor"></textarea>
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
        CKEDITOR.replace('editor', {
            filebrowserUploadUrl: "{{route('ckeditor.image-upload', ['_token' => csrf_token() ])}}",
            filebrowserUploadMethod: 'form'
        });
    </script>

@endsection

