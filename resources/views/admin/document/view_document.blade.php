@extends("admin_layout")
@section("admin_main")
    <div class="section">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <iframe src="https://docs.google.com/viewer?url={{asset("upload/documents/".$document->document_name)}}&embedded=true"></iframe>
                    <iframe width="1120"
                            height="850"
                            src="https://api.aspose.cloud/words/view?foldername=upload/documents&filename={{$document->document_name}}">
                    </iframe>
                </div>
            </div>
        </div>
    </div>

@endsection
