@extends("admin_layout")
@section("admin_main")
    <div class="section">
        <div class="row">
            <?php $message = Session::get("message_success") ?>
            @if($message)
                <div class="alert alert-success col-sm-6">{{$message}}</div>
            @endif
            <?php Session::put("message_success", "") ?>
                <div class="card">
                    <?php $post_deleted = Session::get("post_deleted") ?>
                    @if($post_deleted)
                        <div class="alert alert-warning col-sm-5">
                            <span>You can restore post {{$post_deleted->department_name}}</span>
                            <a href="{{url("admin/manage-posts/".$post_deleted->post_id."/restore")}}" class="btn btn-primary" style="margin-left: 20px">Restore</a>
                        </div>

                    @endif
                    <?php Session::put("post_deleted", "") ?>
                </div>
                <div class="card" >
                    <div class="card-header">
                        <div class="buttons float-sm-end">
                            <a href="{{url("admin/posts/editor")}}" class="btn btn-primary">Create new post</a>
                        </div>
                        <h1 class="card-title">List posts</h1>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-lg">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Post Title</th>
                                        <th>Author</th>
                                        <th>Post Status</th>
                                        <th>Created at</th>
                                        <th>Update at</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @foreach($posts as $item)
                                        <tr>
                                            <td>{{$loop->index + 1}}</td>
                                            <td>{{$item->post_title}}</td>
                                            <td>{{$item->post_author}}</td>
                                            <td>
                                                @if($item->post_status == 0)
                                                    <a  class="btn btn-warning">Pending</a>
                                                @elseif($item->post_status == 1)
                                                    <a  class="btn btn-success">Published</a>
                                                @endif
                                            </td>
                                            <td>{{$item->created_at}}</td>
                                            <td>{{$item->updated_at}}</td>
                                            <td>
                                                <div class="buttons">
                                                    @if($item->post_status == 0)
                                                        <a href="{{url("admin/manage-posts/".$item->post_id."/publish")}}" class="btn btn-success rounded-pill">Publish</a>
                                                    @elseif($item->post_status == 1)
                                                        <a href="{{url("admin/manage-posts/".$item->post_id."/publish")}}" class="btn btn-warning rounded-pill">Unpublished</a>
                                                    @endif
                                                    <a href="{{url("admin/manage-posts/".$item->post_id."/details")}}" class="btn btn-primary rounded-pill">View</a>
                                                    <a data-bs-toggle="modal" data-bs-target="{{"#danger".$item->post_id}}" class="btn btn-danger rounded-pill">Delete</a>
                                                </div>
                                                <div class="modal fade text-left" id="{{"danger".$item->post_id}}" tabindex="-1"
                                                     role="dialog" aria-labelledby="myModalLabel120"
                                                     aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                                                         role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header bg-danger">
                                                                <h5 class="modal-title white" id="myModalLabel120">
                                                                    Warning !!
                                                                </h5>
                                                                <button type="button" class="close"
                                                                        data-bs-dismiss="modal" aria-label="Close">
                                                                    <i data-feather="x"></i>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                Are you sure delete post {{$item->post_title}}
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button"
                                                                        class="btn btn-light-secondary"
                                                                        data-bs-dismiss="modal">
                                                                    <i class="bx bx-x d-block d-sm-none"></i>
                                                                    <span class="d-none d-sm-block">Close</span>
                                                                </button>
                                                                <a href="{{url("admin/manage-posts/".$item->post_id."/delete")}}" class="btn btn-danger ml-1"
                                                                >
                                                                    <i class="bx bx-check d-block d-sm-none"></i>
                                                                    <span class="d-none d-sm-block">Accept</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    </div>

@endsection


