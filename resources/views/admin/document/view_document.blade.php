@extends("admin_layout")
@section("admin_main")
    <div class="section">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
{{--                    <iframe src="https://docs.google.com/viewer?url={{asset("")}}&embedded=true"></iframe>--}}
                <iframe src="{{url("upload/documents/".$document->document_name)}}"></iframe>
                </div>
            </div>
        </div>
    </div>

@endsection
