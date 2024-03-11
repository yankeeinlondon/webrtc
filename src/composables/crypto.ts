import util from "tweetnacl-util";
import auth from "tweetnacl-auth";
import nacl from "tweetnacl";

const USER_SEED = "Ca34sdf5a4sd4fa5d;k4jey4yyy4vv5df3sg4s5dce6gw";
const server = useServer();
const user = useUserStore();

export const crypt = ({

  user_key: async (email: string, registrationDate: number): Promise<Uint8Array> => {
    if (server.hasServer) {
      const res = await fetch(
        `${server.address}/user_key`,
        {
          method: "POST",
          body: JSON.stringify({email, registrationDate})
        }
      );
      if(res.ok) {
        return util.decodeBase64(await res.json());
      }
    } else {
      return util.decodeBase64(`${USER_SEED}${email}${registrationDate}`);
    }
  },

  /**
   * authenticates a user with username, password, and a challenge text and mac token
   */
  authenticate: (username: string, password: string, challenge: string, mac: string) => {
    const registered = user.profile?.registered;
    if (!registered) {
      return null;
    }
    const userKey = crypt.user_key(username, registered);
    const token = auth(challenge, userKey);
    return
  },

  signing_key_pair: ():{secretKey: Uint8Array, publicKey: Uint8Array}  => {
    return nacl.sign.keyPair() as {secretKey: Uint8Array, publicKey: Uint8Array};
  }



});

