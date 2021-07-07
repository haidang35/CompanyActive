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
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="list-group">
                @forelse(auth()->user()->unreadNotifications as $notification)
                    <button type="button" class="list-group-item list-group-item-action">
                        <div class="avatar avatar-lg me-3" style="margin: auto">
                            <img src="{{asset("assets/images/faces/2.jpg")}}" alt="" srcset="">
                           @include('admin.notification.'.\Illuminate\Support\Str::snake(class_basename($notification->type)))
                            @empty
                                <a href="#">No unread notification</a>
                        </div>
                    </button>
                    @endif
            </div>
        </div>
    </div>
@endsection
