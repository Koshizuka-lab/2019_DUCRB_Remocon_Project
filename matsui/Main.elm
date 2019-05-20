module Main exposing (..)

import Http exposing (Error(..))
import Json.Decode as Decode
import Task exposing (Task)
import List exposing (head)
import Browser
import Subscriptions
import Html exposing (Html, div, text)
import Html.Attributes as Html
import Material
import Material.Button as Button
import Material.Card as Card
import Material.Options as Options
import Material.Options exposing (Property, cs, css, styled, when)
import Task
import Tuple exposing (first)
import Base64
import Material.TopAppBar as TopAppBar
import Dict exposing (Dict)

type alias Model =
    { instance : String
    , mdc : Material.Model Msg 
    , index : Dict Material.Index TABState
    }

init : () -> ( Model, Cmd Msg )
init _ =
    ( defaultModel, Cmd.none )

type Msg
    = KickTestServer
    | GotServerResponse (Result Http.Error Response)
    | Mdc (Material.Msg Msg)
    | TABStateMsg Material.Index TABStateMsg

type alias TABState =
    { rtl : Bool
    }


defaultTABState : TABState
defaultTABState =
    { rtl = False
    }

defaultModel : Model
defaultModel =
    { instance = "switch light"
    , mdc = Material.defaultModel 
    , index = Dict.empty
    }

type TABStateMsg
    = ToggleRtl
    | OpenDrawer

iterate : Int -> Html.Html msg -> List (Html.Html msg)
iterate i h =
    if i < 1 then [h] else h :: (iterate (i - 1) h)

view model =
    div 
    []
    [ div 
        []
        [ shortTopAppBar "top-app-bar-short" model ]
    , div
        []
        (iterate 10 (styled div
        [ css "padding" "1rem"
        , css "text-align" "center"
        , css "margin-top" "100px"
        ]
        [ Card.view 
            [ css "width" "80%"
            , css "display" "inline-block"
            , css "box-sizing" "border-box"
            , css "height" "100px"
            , css "border" "1px solid #f0f0f0" ]
            [ styled div
                [ css "padding" "1rem" ]
                    [ Button.view Mdc
                        "my-button"
                        model.mdc
                        [ Button.ripple
                        , Button.raised
                        , Options.onClick KickTestServer
                        , cs "black"
                        ]
                        [ text model.instance ] ]
            ]
        ]))
    ]

topAppBarWrapper :
    Material.Index
    -> Model
    -> List (Property c m)
    -> Html m
    -> Html m
topAppBarWrapper index model options topappbar =
    let
        state =
            Dict.get index model.index
                |> Maybe.withDefault defaultTABState
    in
    styled Html.div
        [ cs "mdc-topappbar-demo"
        , Options.attribute (Html.dir "rtl") |> when state.rtl
        ]
        [ topappbar
        -- , tabbody options index model
        ]
-- tabbody : List (Options.Property c m) -> Material.Index -> Model -> Html m
-- tabbody options index model =
--     styled Html.div
--         options
--         (List.concat
--             [   [ Button.view Mdc
--                     (index ++ "-toggle-rtl")
--                     model.mdc
--                     [ Button.outlined
--                     , Button.dense
--                     , Options.onClick (TABStateMsg (index ++ "-toggle-rtl") ToggleRtl)
--                     ]
--                     [ text "Toggle RTL"
--                     ]
--                 ]
--             , List.repeat 18 <|
--                 Html.p []
--                     [ text """
-- Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
-- turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
-- sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
-- mi vitae est. Pellentesque habitant morbi tristique senectus et netus et
-- malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
-- ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
-- semper. Aenean ultricies mi vitae est.
--     """
--                     ]
--             ]
--         )


shortTopAppBar : Material.Index -> Model -> Html Msg
shortTopAppBar index model =
    topAppBarWrapper
        index
        model
        [ TopAppBar.fixedAdjust
        ]
        (TopAppBar.view Mdc
            index
            model.mdc
            [ TopAppBar.short
            , TopAppBar.hasActionItem
            , cs "black"
            ]
            [ TopAppBar.section
                [ TopAppBar.alignStart
                ]
                [ TopAppBar.navigationIcon Mdc (index ++ "-menu") model.mdc [] "menu"
                , TopAppBar.title [] [ text "Title" ]
                ]
            , TopAppBar.section
                [ TopAppBar.alignEnd
                ]
                [ TopAppBar.actionItem Mdc (index ++ "-file_download") model.mdc [] "file_download"
                ]
            ]
        )

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ instance } as model) =
    case msg of
        KickTestServer ->
            ( model, Task.attempt GotServerResponse <| getTestServerResponse )

        GotServerResponse res ->
            case res of
                Ok rc ->
                    ( { model | instance = 
                        case (head <| rc) of
                            Just e -> case (head <| e.data) of
                                    Just i -> i.instance
                                    Nothing -> "nothing"
                            Nothing -> "nothing" }, Cmd.none )
                Err err ->
                    ( { model | instance = "Error: " ++ httpErrorToString err }, Cmd.none )
        Mdc msg_ ->
            Material.update Mdc msg_ model
        TABStateMsg index msg_ ->
            let
                tstate =
                    Dict.get index model.index
                        |> Maybe.withDefault defaultTABState
                        |> updateTABState msg_

                tstates =
                    Dict.insert index tstate model.index
            in
            ( { model | index = tstates }, Cmd.none )

updateTABState : TABStateMsg -> TABState -> TABState
updateTABState msg model =
    case msg of
        ToggleRtl ->
            { model | rtl = not model.rtl }
        OpenDrawer ->
            model

type alias Response = List ResponseElem

type alias ResponseElem = 
    { cellName : String, paramName : String, data : List InstanceData }

type alias InstanceData =
    { instance : String, moment : String }

getTestServerResponse : Task Http.Error Response
getTestServerResponse =
    Http.task
        { method = "GET"
        , headers = [ buildAuthorizationHeader "username" "password" ]
        , url = "url"
        , body = Http.emptyBody
        , resolver = jsonResolver responseDecoder
        , timeout = Nothing
        }

buildAuthorizationHeader : String -> String -> Http.Header
buildAuthorizationHeader username password =
    Http.header "Authorization" ("Basic " ++ (buildAuthorizationToken username password)) --|> Debug.log "ok"

buildAuthorizationToken : String -> String -> String
buildAuthorizationToken username password =
    Base64.encode (username ++ ":" ++ password)

jsonResolver : Decode.Decoder a -> Http.Resolver Http.Error a
jsonResolver decoder =
    Http.stringResolver <|
        \response ->
            case response of
                Http.BadUrl_ url ->
                    Err (Http.BadUrl url)

                Http.Timeout_ ->
                    Err Http.Timeout

                Http.NetworkError_ ->
                    Err Http.NetworkError

                Http.BadStatus_ metadata body ->
                    Err (Http.BadStatus metadata.statusCode)

                Http.GoodStatus_ metadata body ->
                    case Decode.decodeString decoder body of
                        Ok value ->
                            Ok value

                        Err err ->
                            Err (Http.BadBody (Decode.errorToString err))


responseDecoder : Decode.Decoder Response
responseDecoder =
    Decode.list (Decode.map3 ResponseElem
                    (Decode.field "cell_name" Decode.string)
                    (Decode.field "param_name" Decode.string)
                    (Decode.field "data" (Decode.list
                        (Decode.map2 InstanceData
                            (Decode.field "instance" Decode.string)
                            (Decode.field "moment" Decode.string)))
                ))

httpErrorToString : Http.Error -> String
httpErrorToString err =
    case err of
        BadUrl _ ->
            "BadUrl"

        Timeout ->
            "Timeout"

        NetworkError ->
            "NetworkError"

        BadStatus _ ->
            "BadStatus"

        BadBody s ->
            "BadBody: " ++ s


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , subscriptions = subscriptions
        , update = update
        , view = view
        }

subscriptions : Model -> Sub Msg
subscriptions model =
    Material.subscriptions Mdc model
