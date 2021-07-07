@extends("admin_layout")
@section("admin_main")

    <div class="card">
        <div class="card-header">
            <div class="col-12">
                <div class="row">
                    <div class="col-sm-6">
                        <h4 class="card-title">Chúc Công thi tốt nào </h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="list-group">
                @foreach($luckies as $item)
                    <button type="button" class="list-group-item list-group-item-action">
                        <div class="avatar avatar-lg me-3" style="margin: auto">
                            <img src="{{asset("assets/images/faces/".random_int(1, 8).".jpg")}}" alt="" srcset="">
                            <div class="col-sm-12 text-success">
                                <h3>{{$item->content}}</h3>
                            </div>
                        </div>
                    </button>
                @endforeach
            </div>
        </div>
    </div>
@endsection

