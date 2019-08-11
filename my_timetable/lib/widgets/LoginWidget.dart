import 'package:flutter/material.dart';
import 'package:my_timetable/widgets/LoginForm.dart';

Widget LoginWidget()
{
  return Container(
    padding: EdgeInsets.all(2),
    child: Column(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: <Widget>[
        Expanded(
          flex: 2,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Text("MyTimetable", style: TextStyle(fontWeight: FontWeight.w600, color: Colors.black, fontSize: 30)),
              Icon(Icons.bookmark, color: Colors.redAccent, size: 45,)
            ],
          ),
        ),
        Flexible(
            child: LoginForm()
        ),

      ],

    ),
  );
}