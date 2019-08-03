import 'package:flutter/material.dart';
import 'package:my_timetable/screens/Home.dart';
import 'package:my_timetable/screens/Login.dart';


class Routes {
  final routes = <String, WidgetBuilder>{
    '/Home': (BuildContext context) => new Home(),
    '/Login': (BuildContext context) => new Login()
  };

  Routes () {
    runApp(new MaterialApp(
      title: 'Flutter Demo',
      routes: routes,
      home: new Login()
    ));
  }
}