
{{-- <div class="card-header">--}}
{{--            <div class="col-sm-12" style="margin-top: 30px">--}}
{{--                <form action="{{url("/admin/customer-details/".$customer->customer_id)}}" method="get">--}}
{{--                    <div class="row">--}}
{{--                        <div class="col-sm-3">--}}
{{--                            <div class="form-group position-relative has-icon-left">--}}
{{--                                <input type="text" class="form-control" name="appointment_purpose"--}}
{{--                                       placeholder="Search purpose">--}}
{{--                                <div class="form-control-icon">--}}
{{--                                    <i class="bi bi-search"></i>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="col-sm-3">--}}
{{--                            <select class="form-control form-select" name="appointment_project">--}}
{{--                                <option value="0">Choose project</option>--}}
{{--                                @foreach($appointments as $appointment)--}}
{{--                                    <option @if(app("request")->input("appointment_id")==$appointment->appointment_id) selected @endif value="{{$appointment->appointment_id}}">{{$appointment->appointment_project}}</option>--}}
{{--                                @endforeach--}}
{{--                            </select>--}}
{{--                        </div>--}}
{{--                        <div class="col-sm-3">--}}
{{--                            <select class="form-control form-select" name="appointment_status">--}}
{{--                                <option value="0">Choose status</option>--}}
{{--                                @foreach($appointments as $appointment)--}}
{{--                                    <option @if(app("request")->input("appointment_id")==$appointment->appointment_id) selected @endif value="{{$appointment->appointment_id}}">{{$appointment->appointment_status}}</option>--}}
{{--                                @endforeach--}}
{{--                            </select>--}}
{{--                        </div>--}}
{{--                        <div class="col-sm-3">--}}
{{--                            <div class="button">--}}
{{--                                <button type="submit" class="btn btn-primary">Search</button>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </form>--}}
{{--            </div>--}}
{{--        </div>



//    public function scopePurpose($query,$search2 ){
//        dd($search2);
//        if($search2  == null || $search2  == ""){
//            return $query;
//        }else{
//            return $query->where("appointment_purpose","LIKE","%".$search2."%");
//        }
//    }
//    public function scopeProject($query,$appointmentProject){
//        if($appointmentProject == null || $appointmentProject == 0){
//            return $query;
//        }else{
//            return $query->where("appointment_project",$appointmentProject);
//        }
//    }
//    public function scopeStatus($query,$appointmentStatus){
//        if($appointmentStatus == null || $appointmentStatus == 0){
//            return $query;
//        }else{
//            return $query->where("appointment_status",$appointmentStatus);
//        }
//    }


//        $search2 = $request->get("appointment_purpose");
//        $appointmentProject = $request->get("appointment_project");
//        $appointmentStatus = $request->get("appointment_status");
//        $select_customer = Customer::with("Appointment")->purpose($search2)->project($appointmentProject)->status($appointmentStatus)->get();
*/
