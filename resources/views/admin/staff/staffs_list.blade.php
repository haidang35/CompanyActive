
@extends("admin_layout")
@section("admin_main")
    <section id="input-with-icons">
        <div class="row match-height">
            <div class="col-12">
                <div class="card-content">
                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Members</h4>

                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-lg">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Bithday</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Department</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @foreach($staffs as $item)
                                        <tr>
                                            <td>{{$loop->index + 1}}</td>
                                            <td>{{$item->staff_name}}</td>
                                            <td>{{$item->staff_birthday}}</td>
                                            <td>{{$item->staff_email}}</td>
                                            <td>{{$item->staff_phone}}</td>
                                            <td>{{$item->staff_address}}</td>
                                            <td>
                                                @if($item->department_id !== null)
                                                    {{$item->Department->department_name}}
                                                @else
                                                    Không
                                                @endif

                                            </td>
                                            <td>
                                                <div class="buttons">
                                                    <a class="btn btn-primary rounded-pill">View</a>
                                                    <a href="{{url("".$item->staff_id)}}" class="btn btn-danger rounded-pill">Delete</a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                            <div>{{ $staffs->links("vendor.pagination.default")  }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
@endsection

