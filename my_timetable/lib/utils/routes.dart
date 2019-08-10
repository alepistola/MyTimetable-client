import 'package:flutter/material.dart';
import 'package:my_timetable/screens/Home.dart';
import 'package:my_timetable/screens/Login.dart';

final routes = {
  '/login':         (BuildContext context) => new Login(),
  '/home':         (BuildContext context) => new Home(),
  '/' :          (BuildContext context) => new Login(),
};