@extends("admin_layout")
@section("admin_main")
    <div class="section">
        <?php $message = Session::get("message_success") ?>
        @if($message)
            <div class="alert alert-success col-sm-6">{{$message}}</div>
        @endif
        <?php Session::put("message_success", "") ?>
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Basic File Uploader</h5>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <p class="card-text">Upload file here
                            </p>
                            <form action="{{url("admin/documents/upload")}}" method="post" enctype="multipart/form-data">
                                @csrf
                                <input type="file" name="file_document" class="basic-filepond"/>
                                <div class="buttons float-sm-end">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Documents</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                @foreach($documents as $item)
                                    <div class="alert alert-light-secondary color-secondary"><i class="bi bi-star"></i>
                                        <span class="text-black-50">  {{$item->document_name}}</span>
                                        <div class="btn-group-sm float-lg-end">
                                            <a href="{{url("admin/documents/view/".$item->document_id)}}" class="btn btn-primary ">View</a>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>


                    </div>

                </div>
            </div>

    </div>

@endsection
