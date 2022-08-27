// @generated by protoc-gen-es v0.1.0 with parameter "target=js+dts"
// @generated from file plugnmeet_recorder.proto (package plugnmeet, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from '@bufbuild/protobuf';
import { Message, proto3 } from '@bufbuild/protobuf';

/**
 * @generated from enum plugnmeet.RecordingTasks
 */
export declare enum RecordingTasks {
  /**
   * @generated from enum value: START_RECORDING = 0;
   */
  START_RECORDING = 0,

  /**
   * @generated from enum value: STOP_RECORDING = 1;
   */
  STOP_RECORDING = 1,

  /**
   * @generated from enum value: START_RTMP = 2;
   */
  START_RTMP = 2,

  /**
   * @generated from enum value: STOP_RTMP = 3;
   */
  STOP_RTMP = 3,

  /**
   * @generated from enum value: END_RECORDING = 4;
   */
  END_RECORDING = 4,

  /**
   * @generated from enum value: END_RTMP = 5;
   */
  END_RTMP = 5,

  /**
   * @generated from enum value: RECORDING_PROCEEDED = 6;
   */
  RECORDING_PROCEEDED = 6,

  /**
   * @generated from enum value: STOP = 7;
   */
  STOP = 7,
}

/**
 * @generated from enum plugnmeet.RecorderServiceType
 */
export declare enum RecorderServiceType {
  /**
   * @generated from enum value: RECORDING = 0;
   */
  RECORDING = 0,

  /**
   * @generated from enum value: RTMP = 1;
   */
  RTMP = 1,
}

/**
 * @generated from message plugnmeet.PlugNmeetToRecorder
 */
export declare class PlugNmeetToRecorder extends Message<PlugNmeetToRecorder> {
  /**
   * @generated from field: string from = 1;
   */
  from: string;

  /**
   * @generated from field: plugnmeet.RecordingTasks task = 2;
   */
  task: RecordingTasks;

  /**
   * @generated from field: string room_id = 3;
   */
  roomId: string;

  /**
   * @generated from field: string room_sid = 4;
   */
  roomSid: string;

  /**
   * @generated from field: string recording_id = 5;
   */
  recordingId: string;

  /**
   * @generated from field: string recorder_id = 6;
   */
  recorderId: string;

  /**
   * @generated from field: string access_token = 7;
   */
  accessToken: string;

  /**
   * @generated from field: optional string rtmp_url = 8;
   */
  rtmpUrl?: string;

  constructor(data?: PartialMessage<PlugNmeetToRecorder>);

  static readonly runtime: typeof proto3;
  static readonly typeName = 'plugnmeet.PlugNmeetToRecorder';
  static readonly fields: FieldList;

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): PlugNmeetToRecorder;

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): PlugNmeetToRecorder;

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): PlugNmeetToRecorder;

  static equals(
    a: PlugNmeetToRecorder | PlainMessage<PlugNmeetToRecorder> | undefined,
    b: PlugNmeetToRecorder | PlainMessage<PlugNmeetToRecorder> | undefined,
  ): boolean;
}

/**
 * @generated from message plugnmeet.RecorderToPlugNmeet
 */
export declare class RecorderToPlugNmeet extends Message<RecorderToPlugNmeet> {
  /**
   * @generated from field: string from = 1;
   */
  from: string;

  /**
   * @generated from field: plugnmeet.RecordingTasks task = 2;
   */
  task: RecordingTasks;

  /**
   * @generated from field: bool status = 3;
   */
  status: boolean;

  /**
   * @generated from field: string msg = 4;
   */
  msg: string;

  /**
   * @generated from field: string recording_id = 5;
   */
  recordingId: string;

  /**
   * @generated from field: string room_id = 6;
   */
  roomId: string;

  /**
   * @generated from field: string room_sid = 7;
   */
  roomSid: string;

  /**
   * @generated from field: string recorder_id = 8;
   */
  recorderId: string;

  /**
   * @generated from field: string file_path = 9;
   */
  filePath: string;

  /**
   * @generated from field: float file_size = 10;
   */
  fileSize: number;

  constructor(data?: PartialMessage<RecorderToPlugNmeet>);

  static readonly runtime: typeof proto3;
  static readonly typeName = 'plugnmeet.RecorderToPlugNmeet';
  static readonly fields: FieldList;

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): RecorderToPlugNmeet;

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): RecorderToPlugNmeet;

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): RecorderToPlugNmeet;

  static equals(
    a: RecorderToPlugNmeet | PlainMessage<RecorderToPlugNmeet> | undefined,
    b: RecorderToPlugNmeet | PlainMessage<RecorderToPlugNmeet> | undefined,
  ): boolean;
}

/**
 * @generated from message plugnmeet.FromParentToChild
 */
export declare class FromParentToChild extends Message<FromParentToChild> {
  /**
   * @generated from field: plugnmeet.RecordingTasks task = 1;
   */
  task: RecordingTasks;

  /**
   * @generated from field: string recording_id = 2;
   */
  recordingId: string;

  /**
   * @generated from field: string room_id = 3;
   */
  roomId: string;

  /**
   * @generated from field: string room_sid = 4;
   */
  roomSid: string;

  constructor(data?: PartialMessage<FromParentToChild>);

  static readonly runtime: typeof proto3;
  static readonly typeName = 'plugnmeet.FromParentToChild';
  static readonly fields: FieldList;

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): FromParentToChild;

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): FromParentToChild;

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): FromParentToChild;

  static equals(
    a: FromParentToChild | PlainMessage<FromParentToChild> | undefined,
    b: FromParentToChild | PlainMessage<FromParentToChild> | undefined,
  ): boolean;
}

/**
 * @generated from message plugnmeet.FromChildToParent
 */
export declare class FromChildToParent extends Message<FromChildToParent> {
  /**
   * @generated from field: plugnmeet.RecordingTasks task = 1;
   */
  task: RecordingTasks;

  /**
   * @generated from field: bool status = 2;
   */
  status: boolean;

  /**
   * @generated from field: string msg = 3;
   */
  msg: string;

  /**
   * @generated from field: string recording_id = 4;
   */
  recordingId: string;

  /**
   * @generated from field: string room_id = 5;
   */
  roomId: string;

  /**
   * @generated from field: string room_sid = 6;
   */
  roomSid: string;

  constructor(data?: PartialMessage<FromChildToParent>);

  static readonly runtime: typeof proto3;
  static readonly typeName = 'plugnmeet.FromChildToParent';
  static readonly fields: FieldList;

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): FromChildToParent;

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): FromChildToParent;

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): FromChildToParent;

  static equals(
    a: FromChildToParent | PlainMessage<FromChildToParent> | undefined,
    b: FromChildToParent | PlainMessage<FromChildToParent> | undefined,
  ): boolean;
}

/**
 * @generated from message plugnmeet.StartRecorderChildArgs
 */
export declare class StartRecorderChildArgs extends Message<StartRecorderChildArgs> {
  /**
   * @generated from field: string room_id = 1;
   */
  roomId: string;

  /**
   * @generated from field: string recording_id = 2;
   */
  recordingId: string;

  /**
   * @generated from field: string room_sid = 3;
   */
  roomSid: string;

  /**
   * @generated from field: string access_token = 4;
   */
  accessToken: string;

  /**
   * @generated from field: plugnmeet.PlugNmeetInfo plug_n_meet_info = 5;
   */
  plugNMeetInfo?: PlugNmeetInfo;

  /**
   * @generated from field: bool post_mp4_convert = 6;
   */
  postMp4Convert: boolean;

  /**
   * @generated from field: plugnmeet.CopyToPath copy_to_path = 7;
   */
  copyToPath?: CopyToPath;

  /**
   * @generated from field: plugnmeet.RecorderServiceType serviceType = 8;
   */
  serviceType: RecorderServiceType;

  /**
   * @generated from field: optional string recorder_id = 9;
   */
  recorderId?: string;

  /**
   * @generated from field: optional string rtmp_url = 10;
   */
  rtmpUrl?: string;

  /**
   * @generated from field: string websocket_url = 11;
   */
  websocketUrl: string;

  /**
   * @generated from field: optional string custom_chrome_path = 12;
   */
  customChromePath?: string;

  constructor(data?: PartialMessage<StartRecorderChildArgs>);

  static readonly runtime: typeof proto3;
  static readonly typeName = 'plugnmeet.StartRecorderChildArgs';
  static readonly fields: FieldList;

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): StartRecorderChildArgs;

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): StartRecorderChildArgs;

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): StartRecorderChildArgs;

  static equals(
    a:
      | StartRecorderChildArgs
      | PlainMessage<StartRecorderChildArgs>
      | undefined,
    b:
      | StartRecorderChildArgs
      | PlainMessage<StartRecorderChildArgs>
      | undefined,
  ): boolean;
}

/**
 * @generated from message plugnmeet.PlugNmeetInfo
 */
export declare class PlugNmeetInfo extends Message<PlugNmeetInfo> {
  /**
   * @generated from field: string host = 1;
   */
  host: string;

  /**
   * @generated from field: string api_key = 2;
   */
  apiKey: string;

  /**
   * @generated from field: string api_secret = 3;
   */
  apiSecret: string;

  /**
   * @generated from field: optional string join_host = 4;
   */
  joinHost?: string;

  constructor(data?: PartialMessage<PlugNmeetInfo>);

  static readonly runtime: typeof proto3;
  static readonly typeName = 'plugnmeet.PlugNmeetInfo';
  static readonly fields: FieldList;

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): PlugNmeetInfo;

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): PlugNmeetInfo;

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): PlugNmeetInfo;

  static equals(
    a: PlugNmeetInfo | PlainMessage<PlugNmeetInfo> | undefined,
    b: PlugNmeetInfo | PlainMessage<PlugNmeetInfo> | undefined,
  ): boolean;
}

/**
 * @generated from message plugnmeet.CopyToPath
 */
export declare class CopyToPath extends Message<CopyToPath> {
  /**
   * @generated from field: string main_path = 1;
   */
  mainPath: string;

  /**
   * @generated from field: optional string sub_path = 2;
   */
  subPath?: string;

  constructor(data?: PartialMessage<CopyToPath>);

  static readonly runtime: typeof proto3;
  static readonly typeName = 'plugnmeet.CopyToPath';
  static readonly fields: FieldList;

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): CopyToPath;

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): CopyToPath;

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): CopyToPath;

  static equals(
    a: CopyToPath | PlainMessage<CopyToPath> | undefined,
    b: CopyToPath | PlainMessage<CopyToPath> | undefined,
  ): boolean;
}
