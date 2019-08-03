import 'package:flutter/material.dart';
import 'package:my_timetable/widgets/BodyContent.dart';

class Home extends StatelessWidget {
  static const String _title = 'Flutter Code Sample';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: Scaffold(
        appBar: AppBar(title: const Text(_title)),
        body: BodyContent(),
      ),
    );
  }
}
