use oauth2::basic::BasicClient;
use oauth2::reqwest::async_http_client;
use oauth2::{
    AuthUrl, AuthorizationCode, ClientId, ClientSecret, CsrfToken, RedirectUrl, Scope,
    TokenResponse, TokenUrl,
};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::error::Error;

const AUTH_URL: &str = "https://accounts.google.com/o/oauth2/auth";
const TOKEN_URL: &str = "https://accounts.google.com/o/oauth2/token";
const PROFILE_URL: &str = "https://www.googleapis.com/oauth2/v3/userinfo";

pub struct Google {
    client: BasicClient,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct GoogleUserInfo {
    pub sub: String,
    pub name: String,
    pub given_name: Option<String>,
    pub family_name: Option<String>,
    pub picture: String,
    pub email: String,
    pub email_verified: bool,
    pub locale: Option<String>,
}

impl Google {
    pub fn new(client_id: String, client_secret: String, url: String) -> Self {
        let client_id = ClientId::new(client_id);
        let client_secret = ClientSecret::new(client_secret);

        let auth_url = AuthUrl::new(AUTH_URL.to_string()).unwrap();
        let token_url = TokenUrl::new(TOKEN_URL.to_string()).unwrap();

        let client = BasicClient::new(client_id, Some(client_secret), auth_url, Some(token_url))
            .set_redirect_uri(RedirectUrl::new(url.to_string()).unwrap());

        Google { client }
    }

    pub fn get_redirect_url(&self) -> String {
        let (auth_url, _csrf_token) = self
            .client
            .authorize_url(CsrfToken::new_random)
            .add_scope(Scope::new("openid".to_string()))
            .add_scope(Scope::new("email".to_string()))
            .add_scope(Scope::new("profile".to_string()))
            .url();

        auth_url.to_string()
    }

    pub async fn get_profile(&self, code: String) -> Result<GoogleUserInfo, Box<dyn Error>> {
        let result = self
            .client
            .exchange_code(AuthorizationCode::new(code))
            .request_async(async_http_client)
            .await;

        if let Err(err) = result {
            return Err(err.into());
        }

        let token = result.unwrap();
        let client = Client::new();
        let response = client
            .get(PROFILE_URL.to_string())
            .bearer_auth(&token.access_token().secret())
            .send()
            .await?;

        if !response.status().is_success() {
            return Err("Failed to fetch profile information".into());
        }

        let result: GoogleUserInfo = response.json().await?;

        Ok(result)
    }
}
