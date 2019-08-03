import 'package:flutter/material.dart';
import 'package:my_timetable/widgets/LoginWidget.dart';

class Login extends StatelessWidget {
  static const String _title = 'Flutter Code Sample';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: Scaffold(
        body: LoginWidget(),
      ),
    );
  }
}
