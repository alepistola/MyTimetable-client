import 'package:flutter/material.dart';
import 'package:my_timetable/widgets/LoginForm.dart';

Widget LoginWidget()
{
  return Container(
    padding: EdgeInsets.all(2),
    child: Column(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text("MyTimetable", style: TextStyle(fontWeight: FontWeight.w600, color: Colors.black)),
            Icon(Icons.bookmark, color: Colors.redAccent)
          ],
        ),
        LoginForm(),

      ],

    ),
  );
}