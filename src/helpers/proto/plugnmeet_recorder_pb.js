// @generated by protoc-gen-es v0.1.0 with parameter "target=js+dts"
// @generated from file plugnmeet_recorder.proto (package plugnmeet, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {proto3} from "@bufbuild/protobuf";

/**
 * @generated from enum plugnmeet.RecordingTasks
 */
export const RecordingTasks = proto3.makeEnum(
  "plugnmeet.RecordingTasks",
  [
    {no: 0, name: "START_RECORDING"},
    {no: 1, name: "STOP_RECORDING"},
    {no: 2, name: "START_RTMP"},
    {no: 3, name: "STOP_RTMP"},
    {no: 4, name: "END_RECORDING"},
    {no: 5, name: "END_RTMP"},
    {no: 6, name: "RECORDING_PROCEEDED"},
    {no: 7, name: "STOP"},
  ],
);

/**
 * @generated from enum plugnmeet.RecorderServiceType
 */
export const RecorderServiceType = proto3.makeEnum(
  "plugnmeet.RecorderServiceType",
  [
    {no: 0, name: "RECORDING"},
    {no: 1, name: "RTMP"},
  ],
);

/**
 * @generated from message plugnmeet.PlugNmeetToRecorder
 */
export const PlugNmeetToRecorder = proto3.makeMessageType(
  "plugnmeet.PlugNmeetToRecorder",
  () => [
    { no: 1, name: "from", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "task", kind: "enum", T: proto3.getEnumType(RecordingTasks) },
    { no: 3, name: "room_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "room_sid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "recording_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "recorder_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "access_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "rtmp_url", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
);

/**
 * @generated from message plugnmeet.RecorderToPlugNmeet
 */
export const RecorderToPlugNmeet = proto3.makeMessageType(
  "plugnmeet.RecorderToPlugNmeet",
  () => [
    { no: 1, name: "from", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "task", kind: "enum", T: proto3.getEnumType(RecordingTasks) },
    { no: 3, name: "status", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "msg", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "recording_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "room_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "room_sid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "recorder_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "file_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "file_size", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
  ],
);

/**
 * @generated from message plugnmeet.FromParentToChild
 */
export const FromParentToChild = proto3.makeMessageType(
  "plugnmeet.FromParentToChild",
  () => [
    { no: 1, name: "task", kind: "enum", T: proto3.getEnumType(RecordingTasks) },
    { no: 2, name: "recording_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "room_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "room_sid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message plugnmeet.FromChildToParent
 */
export const FromChildToParent = proto3.makeMessageType(
  "plugnmeet.FromChildToParent",
  () => [
    { no: 1, name: "task", kind: "enum", T: proto3.getEnumType(RecordingTasks) },
    { no: 2, name: "status", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "msg", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "recording_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "room_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "room_sid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message plugnmeet.StartRecorderChildArgs
 */
export const StartRecorderChildArgs = proto3.makeMessageType(
  "plugnmeet.StartRecorderChildArgs",
  () => [
    { no: 1, name: "room_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "recording_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "room_sid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "access_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "plug_n_meet_info", kind: "message", T: PlugNmeetInfo },
    { no: 6, name: "post_mp4_convert", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 7, name: "copy_to_path", kind: "message", T: CopyToPath },
    { no: 8, name: "serviceType", kind: "enum", T: proto3.getEnumType(RecorderServiceType) },
    { no: 9, name: "recorder_id", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 10, name: "rtmp_url", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 11, name: "websocket_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 12, name: "custom_chrome_path", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
);

/**
 * @generated from message plugnmeet.PlugNmeetInfo
 */
export const PlugNmeetInfo = proto3.makeMessageType(
  "plugnmeet.PlugNmeetInfo",
  () => [
    { no: 1, name: "host", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "api_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "api_secret", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "join_host", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
);

/**
 * @generated from message plugnmeet.CopyToPath
 */
export const CopyToPath = proto3.makeMessageType(
  "plugnmeet.CopyToPath",
  () => [
    { no: 1, name: "main_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "sub_path", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
);

