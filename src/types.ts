import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void



export type Friend = {
  name: string;
  email: string;
  public_key: string;
}

export type RegistryEntry  = {
  name: string;
  registered: number;
  /** a user's private key for signing messages */
  signing_key: Uint8Array;
  /** a user's public key for signing messages */
  public_key: Uint8Array;
}

/**
 * People who login on this machine
 * and contains key but _non-secret_ aspects
 * of a user profile.
 */
export type Registrar = {
  [email: string]: RegistryEntry
}

export type UserProfile = {
  registered: number;
  email: string;
  name: string;
  signing_key: Uint8Array;
  public_key: Uint8Array;
  friends: Ref<Friend[]>;
  /**
   * A dictionary of chats where the _key_ references
   * the username of the user being talked to and the
   * _value_ is a `Chat` record.
   *
   * @type {Record<string, Chat>}
   */
  chats: Ref<Record<string, Chat>>;
}

export type Message = {
  id: number;
  /** the email/username of the speaker of a given `Message` */
  speaker: string;
  text: string;
  in_response_to?: number;
  timestamp: number;
}

export type Chat = {
  /** the unix epoch timestamp when these two parties started talking */
  start: number;
  /** a unix timestamp indicating the time the last message was sent */
  last_message: number;
  /** the email/username of the person who spoke last */
  last_speaker: string;

  messages: Message[];
}

export type UserAudit = {


}


