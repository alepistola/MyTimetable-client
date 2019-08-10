import 'package:flutter/material.dart';
import 'package:my_timetable/widgets/LoginWidget.dart';

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child : LoginWidget()
      ),
    );
  }
}