import Cookies from "js-cookie";

export class TokenHelper {
  private VITE_ACCESS_TOKEN_PART_ONE: string;
  private VITE_REFRESH_TOKEN_PART_ONE: string;
  private VITE_ACCESS_TOKEN_PART_TWO: string;
  private VITE_REFRESH_TOKEN_PART_TWO: string;

  constructor() {
    this.VITE_ACCESS_TOKEN_PART_ONE =
      import.meta.env.VITE_ACCESS_TOKEN_PART_ONE || "";
    this.VITE_REFRESH_TOKEN_PART_ONE =
      import.meta.env.VITE_REFRESH_TOKEN_PART_ONE || "";
    this.VITE_ACCESS_TOKEN_PART_TWO =
      import.meta.env.VITE_ACCESS_TOKEN_PART_TWO || "";
    this.VITE_REFRESH_TOKEN_PART_TWO =
      import.meta.env.VITE_REFRESH_TOKEN_PART_TWO || "";

    if (
      !this.VITE_ACCESS_TOKEN_PART_ONE ||
      !this.VITE_REFRESH_TOKEN_PART_ONE ||
      !this.VITE_ACCESS_TOKEN_PART_TWO ||
      !this.VITE_REFRESH_TOKEN_PART_TWO
    ) {
      throw new Error("Provide all keys.");
    }
  }

  setTokens(access: string, refresh: string) {
    const accessArray = access.split(".");
    const refreshArray = refresh.split(".");

    localStorage.setItem(
      this.VITE_ACCESS_TOKEN_PART_ONE as string,
      accessArray[0]
    );
    localStorage.setItem(
      this.VITE_REFRESH_TOKEN_PART_ONE as string,
      refreshArray[0]
    );

    Cookies.set(
      this.VITE_ACCESS_TOKEN_PART_TWO as string,
      `${accessArray[1]}.${accessArray[2]}`,
      {
        secure: true,
        sameSite: "Strict",
      }
    );
    Cookies.set(
      this.VITE_REFRESH_TOKEN_PART_TWO as string,
      `${refreshArray[1]}.${refreshArray[2]}`,
      {
        secure: true,
        sameSite: "Strict",
      }
    );
  }

  getTokens() {}

  deleteTokens() {}
}
