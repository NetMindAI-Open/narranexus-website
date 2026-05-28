export type Destination =
  | "cloud_login"
  | "github_release"
  | "docs_get_started"
  | "github_repo"
  | "invite_page";

export type CtaName =
  | "try_online"
  | "download_macos"
  | "get_started"
  | "get_invite_code"
  | "request_invite";

export type CtaLocation =
  | "hero"
  | "navbar"
  | "footer"
  | "login_page"
  | "docs_section"
  | "final_cta";

export type TrackPayload =
  | {
      event: "portal_page_view";
      page_path: string;
      page_title: string;
      referrer: string;
    }
  | {
      event: "cta_click";
      cta_name: CtaName;
      cta_location: CtaLocation;
      destination?: Destination;
    }
  | {
      event: "copy_git_clone_command";
      repo_url: string;
      utm_location: string;
    };
