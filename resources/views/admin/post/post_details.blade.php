@extends("admin_layout")
@section("admin_main")
    <div class="section">
        <div class="row">
                <div class="card" >
                    <div class="card-header">
                        <div class="buttons float-sm-end">
                            <a href="{{url("admin/manage-posts/".$post->post_id."/edit")}}" class="btn btn-primary rounded-pill">Edit Post</a>
                        </div>
                        <h4 class="card-title">Blog</h4>
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h1 class="text-primary">{{$post->post_title}}</h1>
                            <h5>Author: {{$post->post_author}}</h5>
                            <h6 class="text-secondary">Post up at: {{$post->created_at}}</h6>
                        </div>
                        <div class="card-body">
                            {!! html_entity_decode($post->post_content) !!}
                        </div>

                    </div>
                </div>
        </div>
    </div>

@endsection



