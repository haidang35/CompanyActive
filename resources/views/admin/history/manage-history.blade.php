@extends("admin_layout")
@section("admin_main")
    <div class="card">
        <div class="card-header">
            <div class="buttons float-md-end">
                <a href="#" class="btn btn-primary">Remove all</a>
            </div>
            <h4 class="card-title">Manage history</h4>
        </div>
{{--        <div class="card-body">--}}
{{--            <div class="list-group">--}}
{{--                @forelse($user->notifications as $item)--}}
{{--                    <button type="button" class="list-group-item list-group-item-action">--}}
{{--                        <div class="avatar avatar-lg me-3" style="margin: auto">--}}
{{--                            <img src="{{asset("assets/images/faces/2.jpg")}}" alt="" srcset="">--}}
{{--                            <a style="padding: 13px">--}}
{{--                                {{(string)$item->data["appoint"]["body"]}}--}}
{{--                            </a>--}}
{{--                            <span style="padding: 13px 35px " class="text-indigo-500">{{$item->created_at->format("H:i:s d-m-Y")}}</span>--}}
{{--                            @empty--}}
{{--                                <a href="#">History is empty</a>--}}

{{--                        </div>--}}
{{--                    </button>--}}
{{--                @endforelse--}}
{{--            </div>--}}
{{--        </div>--}}
    </div>



@endsection
