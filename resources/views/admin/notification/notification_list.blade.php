@extends("admin_layout")
@section("admin_main")
@extends("admin.notification.message")
    <div class="card">
        <div class="card-header">
            <div class="col-12">
                <div class="row">
                    <div class="col-sm-6">
                        <h4 class="card-title">Manage notification</h4>
                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-sm-6">
                                <form action="{{url("/admin/customers")}}" method="get">
                                    @csrf
                                    <div class="form-group position-relative has-icon-left">
                                        <input type="text" class="form-control" name="customer_name"
                                               placeholder="Search name">
                                        <div class="form-control-icon">
                                            <i class="bi bi-search"></i>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-sm-6">
                                <button class="btn btn-danger"><a style="color: white" onclick="return confirm('Are you sure remove all?')" href="{{url("/admin/manage-noti/remove-noti")}}">Remove all</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="list-group">
                @forelse($user->notifications as $item)
                    <button type="button" class="list-group-item list-group-item-action">
                    <div class="avatar avatar-lg me-3" style="margin: auto">
                        <img src="{{asset("assets/images/faces/2.jpg")}}" alt="" srcset="">
                        <a style="padding: 13px">
                           {{(string)$item->data["appoint"]["body"]}}
                        </a>
                        <span style="padding: 13px 35px " class="text-indigo-500">{{$item->created_at->format("H:i:s d-m-Y")}}</span>
                        @empty
                            <a href="#">No unread notification</a>

                    </div>
                    </button>
                @endforelse
            </div>
        </div>
    </div>
@endsection
