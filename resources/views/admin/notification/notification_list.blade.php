@extends("admin_layout")
@section("admin_main")
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
                                <a href="#" class="btn btn-primary">Remove all</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="list-group">
                <button type="button" class="list-group-item list-group-item-action">
                    <div class="avatar avatar-lg me-3" style="margin: auto">
                        <img src="{{asset("assets/images/faces/2.jpg")}}" alt="" srcset="">
                        <ul style="display: block;list-style: none;">
                            <li><h5>Khach hang: Nguyen Thi Thom</h5></li>
                            <li style="margin-right: 70px;"><p style="font-size: 18px">vua them moi mot lich hen</p></li>
                            <li style="margin-right: 200px;">23 gio truoc</li>
                        </ul>
                    </div>
                    </button>
                <button type="button" class="list-group-item list-group-item-action">Morbi
                    leo
                    risus</button>
                <button type="button" class="list-group-item list-group-item-action">Porta
                    ac
                    consectetur
                    ac</button>
                <button type="button" class="list-group-item list-group-item-action">Vestibulum at
                    eros</button>
            </div>
        </div>
    </div>

@endsection
