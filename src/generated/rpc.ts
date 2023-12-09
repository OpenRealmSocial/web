/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import { HubEvent } from "./hub_event";
import { CastId, Message } from "./message";
import { OnChainEvent } from "./onchain_event";
import {
  CastsByParentRequest,
  Empty,
  EventRequest,
  QidRequest,
  QidsRequest,
  QidsResponse,
  HubInfoRequest,
  HubInfoResponse,
  IdRegistryEventByAddressRequest,
  LinkRequest,
  LinksByQidRequest,
  LinksByTargetRequest,
  MessagesResponse,
  OnChainEventRequest,
  OnChainEventResponse,
  ReactionRequest,
  ReactionsByQidRequest,
  ReactionsByTargetRequest,
  SignerRequest,
  StorageLimitsResponse,
  SubscribeRequest,
  SyncIds,
  SyncStatusRequest,
  SyncStatusResponse,
  TrieNodeMetadataResponse,
  TrieNodePrefix,
  TrieNodeSnapshotResponse,
  UserDataRequest,
  UsernameProofRequest,
  UsernameProofsResponse,
  VerificationRequest,
} from "./request_response";
import { UserNameProof } from "./username_proof";

export interface HubService {
  /** Submit Methods */
  submitMessage(request: DeepPartial<Message>, metadata?: grpc.Metadata): Promise<Message>;
  /**
   * Event Methods
   * @http-api: none
   */
  subscribe(request: DeepPartial<SubscribeRequest>, metadata?: grpc.Metadata): Observable<HubEvent>;
  /** @http-api: events */
  getEvent(request: DeepPartial<EventRequest>, metadata?: grpc.Metadata): Promise<HubEvent>;
  /**
   * Casts
   * @http-api: castById
   */
  getCast(request: DeepPartial<CastId>, metadata?: grpc.Metadata): Promise<Message>;
  getCastsByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  getCastsByParent(request: DeepPartial<CastsByParentRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  getCastsByMention(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /**
   * Reactions
   * @http-api: reactionById
   */
  getReaction(request: DeepPartial<ReactionRequest>, metadata?: grpc.Metadata): Promise<Message>;
  getReactionsByQid(request: DeepPartial<ReactionsByQidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /** To be deprecated */
  getReactionsByCast(
    request: DeepPartial<ReactionsByTargetRequest>,
    metadata?: grpc.Metadata,
  ): Promise<MessagesResponse>;
  getReactionsByTarget(
    request: DeepPartial<ReactionsByTargetRequest>,
    metadata?: grpc.Metadata,
  ): Promise<MessagesResponse>;
  /**
   * User Data
   * @http-api: none
   */
  getUserData(request: DeepPartial<UserDataRequest>, metadata?: grpc.Metadata): Promise<Message>;
  getUserDataByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /**
   * Username Proof
   * @http-api: userNameProofByName
   */
  getUsernameProof(request: DeepPartial<UsernameProofRequest>, metadata?: grpc.Metadata): Promise<UserNameProof>;
  getUserNameProofsByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<UsernameProofsResponse>;
  /**
   * Verifications
   * @http-api: none
   */
  getVerification(request: DeepPartial<VerificationRequest>, metadata?: grpc.Metadata): Promise<Message>;
  getVerificationsByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /**
   * OnChain Events
   * @http-api: none
   */
  getOnChainSigner(request: DeepPartial<SignerRequest>, metadata?: grpc.Metadata): Promise<OnChainEvent>;
  getOnChainSignersByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<OnChainEventResponse>;
  /** @http-api: none */
  getOnChainEvents(request: DeepPartial<OnChainEventRequest>, metadata?: grpc.Metadata): Promise<OnChainEventResponse>;
  /** @http-api: none */
  getIdRegistryOnChainEvent(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<OnChainEvent>;
  /** @http-api: onChainIdRegistryEventByAddress */
  getIdRegistryOnChainEventByAddress(
    request: DeepPartial<IdRegistryEventByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<OnChainEvent>;
  /** @http-api: storageLimitsByQid */
  getCurrentStorageLimitsByQid(
    request: DeepPartial<QidRequest>,
    metadata?: grpc.Metadata,
  ): Promise<StorageLimitsResponse>;
  getQids(request: DeepPartial<QidsRequest>, metadata?: grpc.Metadata): Promise<QidsResponse>;
  /**
   * Links
   * @http-api: linkById
   */
  getLink(request: DeepPartial<LinkRequest>, metadata?: grpc.Metadata): Promise<Message>;
  getLinksByQid(request: DeepPartial<LinksByQidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /** @http-api: linksByTargetQid */
  getLinksByTarget(request: DeepPartial<LinksByTargetRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /**
   * Bulk Methods
   * The Bulk methods don't have corresponding HTTP API endpoints because the
   * regular endpoints can be used to get all the messages
   * @http-api: none
   */
  getAllCastMessagesByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /** @http-api: none */
  getAllReactionMessagesByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /** @http-api: none */
  getAllVerificationMessagesByQid(
    request: DeepPartial<QidRequest>,
    metadata?: grpc.Metadata,
  ): Promise<MessagesResponse>;
  /** @http-api: none */
  getAllUserDataMessagesByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /** @http-api: none */
  getAllLinkMessagesByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /**
   * Sync Methods
   * Outside the "info" RPC, the HTTP API doesn't implement any of the sync methods
   */
  getInfo(request: DeepPartial<HubInfoRequest>, metadata?: grpc.Metadata): Promise<HubInfoResponse>;
  /** @http-api: none */
  getSyncStatus(request: DeepPartial<SyncStatusRequest>, metadata?: grpc.Metadata): Promise<SyncStatusResponse>;
  /** @http-api: none */
  getAllSyncIdsByPrefix(request: DeepPartial<TrieNodePrefix>, metadata?: grpc.Metadata): Promise<SyncIds>;
  /** @http-api: none */
  getAllMessagesBySyncIds(request: DeepPartial<SyncIds>, metadata?: grpc.Metadata): Promise<MessagesResponse>;
  /** @http-api: none */
  getSyncMetadataByPrefix(
    request: DeepPartial<TrieNodePrefix>,
    metadata?: grpc.Metadata,
  ): Promise<TrieNodeMetadataResponse>;
  /** @http-api: none */
  getSyncSnapshotByPrefix(
    request: DeepPartial<TrieNodePrefix>,
    metadata?: grpc.Metadata,
  ): Promise<TrieNodeSnapshotResponse>;
}

export class HubServiceClientImpl implements HubService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.submitMessage = this.submitMessage.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.getCast = this.getCast.bind(this);
    this.getCastsByQid = this.getCastsByQid.bind(this);
    this.getCastsByParent = this.getCastsByParent.bind(this);
    this.getCastsByMention = this.getCastsByMention.bind(this);
    this.getReaction = this.getReaction.bind(this);
    this.getReactionsByQid = this.getReactionsByQid.bind(this);
    this.getReactionsByCast = this.getReactionsByCast.bind(this);
    this.getReactionsByTarget = this.getReactionsByTarget.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getUserDataByQid = this.getUserDataByQid.bind(this);
    this.getUsernameProof = this.getUsernameProof.bind(this);
    this.getUserNameProofsByQid = this.getUserNameProofsByQid.bind(this);
    this.getVerification = this.getVerification.bind(this);
    this.getVerificationsByQid = this.getVerificationsByQid.bind(this);
    this.getOnChainSigner = this.getOnChainSigner.bind(this);
    this.getOnChainSignersByQid = this.getOnChainSignersByQid.bind(this);
    this.getOnChainEvents = this.getOnChainEvents.bind(this);
    this.getIdRegistryOnChainEvent = this.getIdRegistryOnChainEvent.bind(this);
    this.getIdRegistryOnChainEventByAddress = this.getIdRegistryOnChainEventByAddress.bind(this);
    this.getCurrentStorageLimitsByQid = this.getCurrentStorageLimitsByQid.bind(this);
    this.getQids = this.getQids.bind(this);
    this.getLink = this.getLink.bind(this);
    this.getLinksByQid = this.getLinksByQid.bind(this);
    this.getLinksByTarget = this.getLinksByTarget.bind(this);
    this.getAllCastMessagesByQid = this.getAllCastMessagesByQid.bind(this);
    this.getAllReactionMessagesByQid = this.getAllReactionMessagesByQid.bind(this);
    this.getAllVerificationMessagesByQid = this.getAllVerificationMessagesByQid.bind(this);
    this.getAllUserDataMessagesByQid = this.getAllUserDataMessagesByQid.bind(this);
    this.getAllLinkMessagesByQid = this.getAllLinkMessagesByQid.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.getSyncStatus = this.getSyncStatus.bind(this);
    this.getAllSyncIdsByPrefix = this.getAllSyncIdsByPrefix.bind(this);
    this.getAllMessagesBySyncIds = this.getAllMessagesBySyncIds.bind(this);
    this.getSyncMetadataByPrefix = this.getSyncMetadataByPrefix.bind(this);
    this.getSyncSnapshotByPrefix = this.getSyncSnapshotByPrefix.bind(this);
  }

  submitMessage(request: DeepPartial<Message>, metadata?: grpc.Metadata): Promise<Message> {
    return this.rpc.unary(HubServiceSubmitMessageDesc, Message.fromPartial(request), metadata);
  }

  subscribe(request: DeepPartial<SubscribeRequest>, metadata?: grpc.Metadata): Observable<HubEvent> {
    return this.rpc.invoke(HubServiceSubscribeDesc, SubscribeRequest.fromPartial(request), metadata);
  }

  getEvent(request: DeepPartial<EventRequest>, metadata?: grpc.Metadata): Promise<HubEvent> {
    return this.rpc.unary(HubServiceGetEventDesc, EventRequest.fromPartial(request), metadata);
  }

  getCast(request: DeepPartial<CastId>, metadata?: grpc.Metadata): Promise<Message> {
    return this.rpc.unary(HubServiceGetCastDesc, CastId.fromPartial(request), metadata);
  }

  getCastsByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetCastsByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getCastsByParent(request: DeepPartial<CastsByParentRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetCastsByParentDesc, CastsByParentRequest.fromPartial(request), metadata);
  }

  getCastsByMention(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetCastsByMentionDesc, QidRequest.fromPartial(request), metadata);
  }

  getReaction(request: DeepPartial<ReactionRequest>, metadata?: grpc.Metadata): Promise<Message> {
    return this.rpc.unary(HubServiceGetReactionDesc, ReactionRequest.fromPartial(request), metadata);
  }

  getReactionsByQid(request: DeepPartial<ReactionsByQidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetReactionsByQidDesc, ReactionsByQidRequest.fromPartial(request), metadata);
  }

  getReactionsByCast(
    request: DeepPartial<ReactionsByTargetRequest>,
    metadata?: grpc.Metadata,
  ): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetReactionsByCastDesc, ReactionsByTargetRequest.fromPartial(request), metadata);
  }

  getReactionsByTarget(
    request: DeepPartial<ReactionsByTargetRequest>,
    metadata?: grpc.Metadata,
  ): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetReactionsByTargetDesc, ReactionsByTargetRequest.fromPartial(request), metadata);
  }

  getUserData(request: DeepPartial<UserDataRequest>, metadata?: grpc.Metadata): Promise<Message> {
    return this.rpc.unary(HubServiceGetUserDataDesc, UserDataRequest.fromPartial(request), metadata);
  }

  getUserDataByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetUserDataByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getUsernameProof(request: DeepPartial<UsernameProofRequest>, metadata?: grpc.Metadata): Promise<UserNameProof> {
    return this.rpc.unary(HubServiceGetUsernameProofDesc, UsernameProofRequest.fromPartial(request), metadata);
  }

  getUserNameProofsByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<UsernameProofsResponse> {
    return this.rpc.unary(HubServiceGetUserNameProofsByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getVerification(request: DeepPartial<VerificationRequest>, metadata?: grpc.Metadata): Promise<Message> {
    return this.rpc.unary(HubServiceGetVerificationDesc, VerificationRequest.fromPartial(request), metadata);
  }

  getVerificationsByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetVerificationsByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getOnChainSigner(request: DeepPartial<SignerRequest>, metadata?: grpc.Metadata): Promise<OnChainEvent> {
    return this.rpc.unary(HubServiceGetOnChainSignerDesc, SignerRequest.fromPartial(request), metadata);
  }

  getOnChainSignersByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<OnChainEventResponse> {
    return this.rpc.unary(HubServiceGetOnChainSignersByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getOnChainEvents(request: DeepPartial<OnChainEventRequest>, metadata?: grpc.Metadata): Promise<OnChainEventResponse> {
    return this.rpc.unary(HubServiceGetOnChainEventsDesc, OnChainEventRequest.fromPartial(request), metadata);
  }

  getIdRegistryOnChainEvent(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<OnChainEvent> {
    return this.rpc.unary(HubServiceGetIdRegistryOnChainEventDesc, QidRequest.fromPartial(request), metadata);
  }

  getIdRegistryOnChainEventByAddress(
    request: DeepPartial<IdRegistryEventByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<OnChainEvent> {
    return this.rpc.unary(
      HubServiceGetIdRegistryOnChainEventByAddressDesc,
      IdRegistryEventByAddressRequest.fromPartial(request),
      metadata,
    );
  }

  getCurrentStorageLimitsByQid(
    request: DeepPartial<QidRequest>,
    metadata?: grpc.Metadata,
  ): Promise<StorageLimitsResponse> {
    return this.rpc.unary(HubServiceGetCurrentStorageLimitsByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getQids(request: DeepPartial<QidsRequest>, metadata?: grpc.Metadata): Promise<QidsResponse> {
    return this.rpc.unary(HubServiceGetQidsDesc, QidsRequest.fromPartial(request), metadata);
  }

  getLink(request: DeepPartial<LinkRequest>, metadata?: grpc.Metadata): Promise<Message> {
    return this.rpc.unary(HubServiceGetLinkDesc, LinkRequest.fromPartial(request), metadata);
  }

  getLinksByQid(request: DeepPartial<LinksByQidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetLinksByQidDesc, LinksByQidRequest.fromPartial(request), metadata);
  }

  getLinksByTarget(request: DeepPartial<LinksByTargetRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetLinksByTargetDesc, LinksByTargetRequest.fromPartial(request), metadata);
  }

  getAllCastMessagesByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetAllCastMessagesByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getAllReactionMessagesByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetAllReactionMessagesByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getAllVerificationMessagesByQid(
    request: DeepPartial<QidRequest>,
    metadata?: grpc.Metadata,
  ): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetAllVerificationMessagesByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getAllUserDataMessagesByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetAllUserDataMessagesByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getAllLinkMessagesByQid(request: DeepPartial<QidRequest>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetAllLinkMessagesByQidDesc, QidRequest.fromPartial(request), metadata);
  }

  getInfo(request: DeepPartial<HubInfoRequest>, metadata?: grpc.Metadata): Promise<HubInfoResponse> {
    return this.rpc.unary(HubServiceGetInfoDesc, HubInfoRequest.fromPartial(request), metadata);
  }

  getSyncStatus(request: DeepPartial<SyncStatusRequest>, metadata?: grpc.Metadata): Promise<SyncStatusResponse> {
    return this.rpc.unary(HubServiceGetSyncStatusDesc, SyncStatusRequest.fromPartial(request), metadata);
  }

  getAllSyncIdsByPrefix(request: DeepPartial<TrieNodePrefix>, metadata?: grpc.Metadata): Promise<SyncIds> {
    return this.rpc.unary(HubServiceGetAllSyncIdsByPrefixDesc, TrieNodePrefix.fromPartial(request), metadata);
  }

  getAllMessagesBySyncIds(request: DeepPartial<SyncIds>, metadata?: grpc.Metadata): Promise<MessagesResponse> {
    return this.rpc.unary(HubServiceGetAllMessagesBySyncIdsDesc, SyncIds.fromPartial(request), metadata);
  }

  getSyncMetadataByPrefix(
    request: DeepPartial<TrieNodePrefix>,
    metadata?: grpc.Metadata,
  ): Promise<TrieNodeMetadataResponse> {
    return this.rpc.unary(HubServiceGetSyncMetadataByPrefixDesc, TrieNodePrefix.fromPartial(request), metadata);
  }

  getSyncSnapshotByPrefix(
    request: DeepPartial<TrieNodePrefix>,
    metadata?: grpc.Metadata,
  ): Promise<TrieNodeSnapshotResponse> {
    return this.rpc.unary(HubServiceGetSyncSnapshotByPrefixDesc, TrieNodePrefix.fromPartial(request), metadata);
  }
}

export const HubServiceDesc = { serviceName: "HubService" };

export const HubServiceSubmitMessageDesc: UnaryMethodDefinitionish = {
  methodName: "SubmitMessage",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Message.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Message.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceSubscribeDesc: UnaryMethodDefinitionish = {
  methodName: "Subscribe",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return SubscribeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = HubEvent.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetEventDesc: UnaryMethodDefinitionish = {
  methodName: "GetEvent",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return EventRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = HubEvent.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetCastDesc: UnaryMethodDefinitionish = {
  methodName: "GetCast",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CastId.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Message.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetCastsByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetCastsByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetCastsByParentDesc: UnaryMethodDefinitionish = {
  methodName: "GetCastsByParent",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CastsByParentRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetCastsByMentionDesc: UnaryMethodDefinitionish = {
  methodName: "GetCastsByMention",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetReactionDesc: UnaryMethodDefinitionish = {
  methodName: "GetReaction",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ReactionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Message.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetReactionsByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetReactionsByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ReactionsByQidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetReactionsByCastDesc: UnaryMethodDefinitionish = {
  methodName: "GetReactionsByCast",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ReactionsByTargetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetReactionsByTargetDesc: UnaryMethodDefinitionish = {
  methodName: "GetReactionsByTarget",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ReactionsByTargetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetUserDataDesc: UnaryMethodDefinitionish = {
  methodName: "GetUserData",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UserDataRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Message.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetUserDataByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetUserDataByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetUsernameProofDesc: UnaryMethodDefinitionish = {
  methodName: "GetUsernameProof",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UsernameProofRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UserNameProof.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetUserNameProofsByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetUserNameProofsByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UsernameProofsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetVerificationDesc: UnaryMethodDefinitionish = {
  methodName: "GetVerification",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return VerificationRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Message.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetVerificationsByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetVerificationsByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetOnChainSignerDesc: UnaryMethodDefinitionish = {
  methodName: "GetOnChainSigner",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SignerRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = OnChainEvent.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetOnChainSignersByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetOnChainSignersByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = OnChainEventResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetOnChainEventsDesc: UnaryMethodDefinitionish = {
  methodName: "GetOnChainEvents",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return OnChainEventRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = OnChainEventResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetIdRegistryOnChainEventDesc: UnaryMethodDefinitionish = {
  methodName: "GetIdRegistryOnChainEvent",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = OnChainEvent.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetIdRegistryOnChainEventByAddressDesc: UnaryMethodDefinitionish = {
  methodName: "GetIdRegistryOnChainEventByAddress",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return IdRegistryEventByAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = OnChainEvent.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetCurrentStorageLimitsByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetCurrentStorageLimitsByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = StorageLimitsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetQidsDesc: UnaryMethodDefinitionish = {
  methodName: "GetQids",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QidsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetLinkDesc: UnaryMethodDefinitionish = {
  methodName: "GetLink",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return LinkRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Message.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetLinksByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetLinksByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return LinksByQidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetLinksByTargetDesc: UnaryMethodDefinitionish = {
  methodName: "GetLinksByTarget",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return LinksByTargetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetAllCastMessagesByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetAllCastMessagesByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetAllReactionMessagesByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetAllReactionMessagesByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetAllVerificationMessagesByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetAllVerificationMessagesByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetAllUserDataMessagesByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetAllUserDataMessagesByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetAllLinkMessagesByQidDesc: UnaryMethodDefinitionish = {
  methodName: "GetAllLinkMessagesByQid",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetInfoDesc: UnaryMethodDefinitionish = {
  methodName: "GetInfo",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return HubInfoRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = HubInfoResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetSyncStatusDesc: UnaryMethodDefinitionish = {
  methodName: "GetSyncStatus",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SyncStatusRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SyncStatusResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetAllSyncIdsByPrefixDesc: UnaryMethodDefinitionish = {
  methodName: "GetAllSyncIdsByPrefix",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return TrieNodePrefix.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SyncIds.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetAllMessagesBySyncIdsDesc: UnaryMethodDefinitionish = {
  methodName: "GetAllMessagesBySyncIds",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SyncIds.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MessagesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetSyncMetadataByPrefixDesc: UnaryMethodDefinitionish = {
  methodName: "GetSyncMetadataByPrefix",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return TrieNodePrefix.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = TrieNodeMetadataResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const HubServiceGetSyncSnapshotByPrefixDesc: UnaryMethodDefinitionish = {
  methodName: "GetSyncSnapshotByPrefix",
  service: HubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return TrieNodePrefix.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = TrieNodeSnapshotResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export interface AdminService {
  rebuildSyncTrie(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Empty>;
  deleteAllMessagesFromDb(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Empty>;
  submitOnChainEvent(request: DeepPartial<OnChainEvent>, metadata?: grpc.Metadata): Promise<OnChainEvent>;
}

export class AdminServiceClientImpl implements AdminService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.rebuildSyncTrie = this.rebuildSyncTrie.bind(this);
    this.deleteAllMessagesFromDb = this.deleteAllMessagesFromDb.bind(this);
    this.submitOnChainEvent = this.submitOnChainEvent.bind(this);
  }

  rebuildSyncTrie(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(AdminServiceRebuildSyncTrieDesc, Empty.fromPartial(request), metadata);
  }

  deleteAllMessagesFromDb(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(AdminServiceDeleteAllMessagesFromDbDesc, Empty.fromPartial(request), metadata);
  }

  submitOnChainEvent(request: DeepPartial<OnChainEvent>, metadata?: grpc.Metadata): Promise<OnChainEvent> {
    return this.rpc.unary(AdminServiceSubmitOnChainEventDesc, OnChainEvent.fromPartial(request), metadata);
  }
}

export const AdminServiceDesc = { serviceName: "AdminService" };

export const AdminServiceRebuildSyncTrieDesc: UnaryMethodDefinitionish = {
  methodName: "RebuildSyncTrie",
  service: AdminServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AdminServiceDeleteAllMessagesFromDbDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteAllMessagesFromDb",
  service: AdminServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const AdminServiceSubmitOnChainEventDesc: UnaryMethodDefinitionish = {
  methodName: "SubmitOnChainEvent",
  service: AdminServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return OnChainEvent.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = OnChainEvent.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;
    streamingTransport?: grpc.TransportFactory;
    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;
      streamingTransport?: grpc.TransportFactory;
      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any> {
    const upStreamCodes = this.options.upStreamRetryCodes || [];
    const DEFAULT_TIMEOUT_TIME: number = 3_000;
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
    return new Observable((observer) => {
      const upStream = (() => {
        const client = grpc.invoke(methodDesc, {
          host: this.host,
          request,
          transport: this.options.streamingTransport || this.options.transport,
          metadata: maybeCombinedMetadata,
          debug: this.options.debug,
          onMessage: (next) => observer.next(next),
          onEnd: (code: grpc.Code, message: string, trailers: grpc.Metadata) => {
            if (code === 0) {
              observer.complete();
            } else if (upStreamCodes.includes(code)) {
              setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
            } else {
              const err = new Error(message) as any;
              err.code = code;
              err.metadata = trailers;
              observer.error(err);
            }
          },
        });
        observer.add(() => {
          if (!observer.closed) {
            return client.close();
          }
        });
      });
      upStream();
    }).pipe(share());
  }
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
