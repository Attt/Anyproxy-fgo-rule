static function OnBeforeResponse(oSession: Session) {
    if (m_Hide304s && oSession.responseCode == 304) {
        oSession["ui-hide"] = "true";
    }
    // modify battle data
    if (oSession.url.Contains("ac.php") && (oSession.GetRequestBodyAsString().Contains("battlesetup") || oSession.GetRequestBodyAsString().Contains("battleresume"))) {
        var responseStr: String = oSession.GetResponseBodyAsString();
        responseStr = responseStr.Replace("%3D", "=");
        var plainResStr: String = System.Text.Encoding.ASCII.GetString(System.Convert.FromBase64String(responseStr));
        var json = Fiddler.WebFormats.JSON.JsonDecode(plainResStr);
        if (json.JSONObject["cache"]["replaced"]["battle"] != undefined) {
            var svts = json.JSONObject["cache"]["replaced"]["battle"][0]["battleInfo"]["userSvt"];
            for (var sv in svts) {
                // enemy servant
                if (sv["hpGaugeType"] != undefined) {
                    if (typeof sv['hp'] == typeof "") {
                        sv['hp'] = Convert.ToString((int)(Convert.ToInt32(sv['hp']) / 3));
                    } else {
                        sv['hp'] = (int)(sv['hp'] / 3);
                    }
                    sv['maxActNum'] = 1;
                    sv['chargeTurn'] = 6;
                }
                // servant
                if (sv["status"] != undefined && sv["userId"] != undefined && sv["userId"] != "0" && sv["userId"] != 0) {
                    if (typeof sv['hp'] == typeof "") {
                        sv['hp'] = Convert.ToString((int)(Convert.ToInt32(sv['hp']) + 100000));
                    } else {
                        sv['hp'] = (int)(sv['hp'] + 100000);
                    }

                    sv["skillLv1"] = "10";
                    sv["skillLv2"] = "10";
                    sv["skillLv3"] = "10";
                    sv["treasureDeviceLv"] = "5";
                }
            }
            delete json.JSONObject['sign'];
            var resChanged = Fiddler.WebFormats.JSON.JsonEncode(json.JSONObject);
            oSession.utilSetResponseBody(System.Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(resChanged)).Replace("=", "%3D"));
        }
    }

}