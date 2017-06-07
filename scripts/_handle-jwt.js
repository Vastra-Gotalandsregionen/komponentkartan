$(function () {

    if (!window.location.hash) {
        getToken();
    } else {
        validateToken();
    }

});
var access_token, id_token;

function show(data) {
    var logText;

    if (typeof data !== 'string') {
        logText = JSON.stringify(data, null, 2);
    }
    else {
        logText = data;
    }
    console.log("JWT: " + logText);
}
function clear() {
    
}
function showError(error) {
    show(error && error.message || error);
}
function rand() {
    return (Date.now() + "" + Math.random()).replace(".", "");
}

function showTokenResponse() {
    var hash = window.location.hash.substr(1);
    var result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});

    show("authorize response");
    show(result);

    if (result.id_token || result.access_token) {
        document.querySelector("body").className = "token";
    }
}

var client_id = 'http://localhost:3000';

function getToken() {
    var authorizationUrl = 'https://localhost:44333/core/connect/authorize';
    var redirect_uri = window.location.protocol + "//" + window.location.host + "/index.html";
    var response_type = "id_token token";
    var scope = "openid profile read write";

    var state = rand();
    var nonce = rand();
    localStorage["state"] = state;
    localStorage["nonce"] = nonce;

    var url =
        authorizationUrl + "?" +
            "client_id=" + encodeURI(client_id) + "&" +
            "redirect_uri=" + encodeURI(redirect_uri) + "&" +
            "response_type=" + encodeURI(response_type) + "&" +
            "scope=" + encodeURI(scope) + "&" +
            "state=" + encodeURI(state) + "&" +
            "nonce=" + encodeURI(nonce);
    window.location = url;
}

function validateToken() {
    clear();

    var hash = window.location.hash.substr(1);
    var result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});

    if (result.error) {
        show(result);
        return;
    }

    if (result.state !== localStorage["state"]) {
        show("invalid state");
        return;
    }

    //localStorage.removeItem("state");

    id_token = result.id_token;
    localStorage["id_token"] = id_token;

    if (!id_token) {
        show("no id_token");
        return;
    }

    var metadata_url = 'https://localhost:44333/core/.well-known/openid-configuration';

    getJson(metadata_url).then(function (metadata) {
        //show(metadata);
        //show(metadata.jwks_uri);

        getJson(metadata.jwks_uri).then(function (jwks) {
            //show(jwks);

            var cert = jwks.keys[0].x5c[0];
            //show(cert);

            var jws = new KJUR.jws.JWS();
            if (jws.verifyJWSByPemX509Cert(id_token, cert)) {
                var id_token_contents = JSON.parse(jws.parsedJWS.payloadS);

                if (localStorage["nonce"] !== id_token_contents.nonce) {
                    show("Invalid nonce");
                    return;
                }
                //localStorage.removeItem("nonce");

                if (id_token_contents.iss !== metadata.issuer) {
                    show("Invalid issuer");
                    return;
                }

                if (id_token_contents.aud !== client_id) {
                    show("Invalid audience");
                    return;
                }

                var now = parseInt(Date.now() / 1000);

                // accept tokens issues up to 5 mins ago
                var diff = now - id_token_contents.iat;
                if (diff > (5 * 60)) {
                    show("Token issued too long ago");
                    return;
                }

                if (id_token_contents.exp < now) {
                    show("Token expired");
                    return;
                }

                show("id_token_contents");
                show(id_token_contents);

                if (result.access_token) {
                    if (!id_token_contents.at_hash) {
                        show("No at_hash in id_token");
                        return;
                    }

                    var hash = KJUR.crypto.Util.sha256(result.access_token);
                    var left = hash.substr(0, hash.length / 2);
                    var left_b64u = hextob64u(left);

                    if (left_b64u !== id_token_contents.at_hash) {
                        show("at_hash failed to validate");
                        return;
                    }

                    access_token = result.access_token;

                    getJson(metadata.userinfo_endpoint, result.access_token).then(function (result) {
                        show("userinfo endpoint results");
                        show(result);

                        show(result.name);
                        $('.login-info__username__name').text(result.name);
                    }, showError);
                }
            }
        }, showError);
    }, showError);
}


function logout() {
    //window.location = "https://localhost:44333/core/connect/endsession";
    window.location = "https://localhost:44333/core/connect/endsession?post_logout_redirect_uri=" + encodeURIComponent(window.location.protocol + "//" + window.location.host + "/index.html") + "&id_token_hint=" + encodeURIComponent(id_token);
}

function getJson(url, token) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "json";

        xhr.onload = function () {
            try {
                if (xhr.status === 200) {
                    var response = xhr.response;
                    if (typeof response === "string") {
                        response = JSON.parse(response);
                    }
                    resolve(response);
                }
                else {
                    reject(Error(xhr.statusText + "(" + xhr.status + ")"));
                }
            }
            catch (err) {
                reject(err);
            }
        };

        xhr.onerror = function () {
            reject(Error("Network Error"));
        }

        xhr.open("GET", url);

        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }

        xhr.send();
    });
}