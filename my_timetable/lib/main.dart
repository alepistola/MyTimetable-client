import 'package:flutter/material.dart';
import 'package:my_timetable/utils/routes.dart';

void main() => runApp(MyTimetable());

class MyTimetable extends StatelessWidget{
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'MyTimetable',
      theme: new ThemeData(
        primarySwatch: Colors.red,
      ),
      routes: routes,
    );
  }
}

