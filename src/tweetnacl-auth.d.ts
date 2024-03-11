declare module 'tweetnacl-auth' {

  export interface Auth {

    /**
     * Returns HMAC-SHA-512 (without truncation) of the message under the key
     */
    (message: string, key: any): Uint8Array,
    /**
     * Returns HMAC-SHA-512 (without truncation) of the message under the key
     */
    full: (message: string, key: any) => Uint8Array,

    /** Length of authenticator returned by `nacl.auth()` */
    authLength: number;
    /** Length of authenticator returned by `nacl.auth.full()`  */
    authFullLength: number;
    /**
     * Length of key for `nacl.auth()` and `nacl.auth.full()`
     *
     * Note: _key length is currently not enforced._
     **/
    keyLength: number;
  }

  const _default: Auth;
  export default _default;
}
