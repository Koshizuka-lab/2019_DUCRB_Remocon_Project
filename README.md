# 2019年 M1+B4 センサーノード説明会 資料

作成日：2019/04/17

## 1.はじめに

本ドキュメントは、2019年 M1+B4の建物API制御・マイリモコン作成の勉強会に向けた文書です。  
建物APIの仕様に関しては、別途お配りしているダイワユビキタス学術研究館 API仕様ドキュメントを参照してください。  

### 1.1 配布物

◯Raspberry pi Zero x1  
◯Arduino leonardo eth x1　（利用は必須ではありません）  
◯Kuman SensorKit Box x１  
◯ミニブレッドボード  

### 1.2 作成目標

Raspberry piとSensorKitを用いたダイワユビキタスAPIのオブジェクトを操作するリモコン作成

### 1.3 作業期間

2019/04/17(木) ~ 2019/5/16(木)  
2019/05/17(金)：全体ミーティングにて成果発表‼︎  

### 1.4 使用するクラウドサービス

◯Github : ソースコード管理  
　　→https://github.co.jp/  
　　→https://github.com/Koshizuka-lab :越塚研用Orgnization  
◯isaax   : デプロイおよびデバイス監視  
　　→https://isaax.io/
 
 
 Githubのアカウントについては、既に持っている場合はそれを使ってもらっても構いません。  
 isaaxはGithubアカウント連携をすると楽です。　　
 
※越塚研用のOrganizationに参加するための招待メールは、各自の研究室メールアドレスに対して後ほど送ります。  

## 2. 作業開始

ここからは、Raspberry pi zeroの設定から順番に行なっていきます。  
以下に記載する手順は、あくまでも一例です。  
ご自身でやりやすいように変更していただいて構いません。

## 2.1 Raspberry pi イメージ展開  

Raspberry pi用のOSイメージをSDカードにコピーします。  

URL: https://www.raspberrypi.org/downloads/raspbian/  

Raspbian Stretch Lite のイメージをDLして解凍してください。  

書き込み用ソフト：Etcher  
URL: https://www.balena.io/etcher/?ref=etcher_footer  

DLして作業用端末にインストールしてください。  

### 2.2 Raspberry pi 無線LAN, SSH設定  

OSの書き込みが完了するとSDカードがBOOTという名前で認識されるようになります。  
SDカードのルートディレクトリに無線LAN設定ファイル(wpa_supplicant.conf)を配置しておくと、起動時に自動的に無線LAN設定を実行してるようになります。  
以下の内容をコピーして、ルートディレクトリに配置してください。  


```bash:wpa_supplicant.conf
wpa_supplicant.conf
country=JP
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
	ssid="UTLab_G"
	psk=58aabbbb75dc5dd65d0650b22ac3dbafda70c7fdefdac54ad7361bbea84c5b7c
}
network={
	ssid="DUCRB-LAB"
	psk=285b660c0a78fe6e1b205e21b623c44c5bc800b2f46d6ebec9812f084a0315fb
}

```

また、Raspberry piへリモートで接続するために、SSH設定を有効化させておきます。  
SDカードのルートディレクトリにSSH設定ファイル(ssh)を作成してください。  
Macの場合はターミナルから以下のコマンドを実行します。  

```bash:ssh
touch /Volumes/boot/ssh
```

上記の作業が完了したら、SDカードをRaspberry pi に刺して起動させてください。  

### 2.3 Raspberry pi 起動〜初期設定  

Raspberry pi にssh するためにIPアドレスを調べます(初回のみ実行)。  
固定IPを割り当てる場合は、以下の作業は必要ありません。  
#### Macの場合
IPアドレスを調べるコマンドはいくつかありますが、今回はarp-scanを使った方法について説明します。  
はじめに、brewを使ってarp-scanをインストールします。

```bash:
brew install arp-scan
```

実行するコマンドは次の通りです。
```bash:
sudo arp-scan -l --interface en0
```

en0の部分はRaspberry Piと同じローカルネットに接続しているネットワークアダプタを指定してください。  
ifconfigコマンドなどで調べることが可能です。  
以下のような表示が出れば成功です。IPアドレス、MACアドレス、デバイス名が表示されます。  

```bash:
192.168.1.1    bc:5c:dc:ad:5f:ef   (Unknown)  
192.168.1.10   b8:27:eb:22:23:08   Rasberry Pi Foundation  
192.168.1.100  4f:5c:e2:12:65:cd   (Unknown)  
```

#### 2.3.1 SSHでログイン

ターミナルから以下のコマンドを実行してください。  
初回ログイン時にはメッセージが表示されると思いますが、yesで構いません。  

```bash:
ssh pi@上記で調べたIPアドレス
password: raspberry
```

以下のような文章が表示されれば、SSHでのログイン成功です。  

```bash:
Linux raspberrypi 4.14.98+ #1200 Tue Feb 12 20:11:02 GMT 2019 armv6l

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Wed Apr 17 18:20:33 2019 from 172.26.30.6

SSH is enabled and the default password for the 'pi' user has not been changed.
This is a security risk - please login as the 'pi' user and type 'passwd' to set a new password.

pi@raspberrypi:~ $
```

#### 2.3.2 パスワード変更  

piユーザとrootユーザのパスワードを変更します。  

```bash:パスワード変更
pi ユーザのパスワード変更
pi@raspberrypi:~ $ passwd
Changing password for pi.
(current) UNIX password:  raspberry と入力
Enter new UNIX password:  koshizuka-lab と入力
Retype new UNIX password:  koshizuka-lab と入力

root ユーザのパスワード変更
pi@raspberrypi:~ $ sudo passwd root
Enter new UNIX password:  koshizuka-lab と入力
Retype new UNIX password:  koshizuka-lab と入力
```

#### 2.3.4 Time zone設定

```bash:
pi@raspberrypi:~ $ sudo raspi-config
Localisation Options > Change Timezone > Asia > Tokyo を選択して変更

<Finish>を選択するには左または右キーを押すと選べます。  
```

#### 2.3.5 Raspberry pi Update, Gitインストール

```bash:RaspberypiUpdate
pi@raspberrypi:~ $ sudo apt-get update
pi@raspberrypi:~ $ sudo apt-get -y upgrade
pi@raspberrypi:~ $ sudo rpi-update
pi@raspberrypi:~ $ sudo apt-get install -y git
```  

上記が全て完了すれば初期設定は完了です。  

## 3. GitHub, isaax初回設定

GitHubとisaax設定を行なっていきます。

### 3.1 GitHub アカウント作成

GitHub公式サイトからアカウントを作成してください。  
https://github.co.jp/  

なお、個人のアカウントが既にある人はそちらを使っていただいても構いません。  


### 3.2 GitHub レポジトリ作成

右上の + をクリックして「New repository」を選択。  
「Repository name」を入力して「Create repository」をクリックして作成してください。

### 3.3 作業ディレクトリとGitHubレポジトリの紐付け

※以下の内容は作業端末で行なってください。  

#### 3.3.1 作業ディレクトリの作成  
ディレクトリ名は好きに設定していただいて構いません。  

```bash:作業ディレクトリ作成
mkdir Ducrb_Reomocon
cd Ducrb_remocon 
```

#### 3.3.2 Gitフォルダ作成
.gitフォルダが作成されます。

```bash:
git init
```

#### 3.3.3 ユーザ名・メールアドレスの設定
GitHubのユーザ名とメールアドレスを設定してください。

```bash:
git config user.name ユーザ名
git config user.email メールアドレス
```

なお、--global オプションをつけると、今後全てのGit操作でこのユーザ情報を利用することができるようになります。  
反対に、一つのディレクトリ内のみで別のユーザ情報を利用したい場合は、--local オプションをつけると良いです。  
ただし、Mac端末においてはキーチェーンアクセス上にGitHubのアカウント情報が残っていると、push する際にそちらの情報が利用されるので、キーチェーンアクセスを消すことをお勧めします。  

#### 3.3.4 Gitリポジトリとの紐付け

```bash:Git紐付け
echo "# test" >> README.md
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/<GitUserName>/<repositoryName>.git
git push -u origin master
```

#### 3.3.5 isaax用ファイル(isaax.json), テスト用ファイル(app.py)作成

以下の内容をコピペして、isaax.jsonを作成してください。  

```bash:isaxx.json
{
  "name": "getting-started-isaax",
  "version": "",
  "description": "python - raspberry-pi",
  "main": "app.py",
  "author": "",
  "license": "",
  "language":"python",
  "scripts": {
     "start": "python -u app.py"
    },
   "dependency": null
}
```

以下の内容をコピペして、app.pyを作成してください。  

```bash:app.py
import time

while True:
      print("Hello IoT from Isaax")
      time.sleep(5)
```

### 3.3.6 Gitリポジトリにpush

先ほど作成した, isaax.json と app.py をGitリポジトリにpushします。  

```bash:
git add isaax.json app.py
git commit -m "Add isaax.json, app.py"
git push origin master
```

### 3.4 isaax 設定

#### 3.4.1 isaaxアカウント作成

公式サイトにアクセスします。  
https://isaax.io/  

右上の「ログイン」から「Github」を選択して、Githubのアカウントでログインしてください。

#### 3.4.2 プロジェクト作成

ダッシュボードから「新規プロジェクト追加」を選択し、「GitHub」を選択。  
リポジトリを先ほどGitHub上で作成した項目を選択。  
プロジェクト名は、「2019_DucrbRemocon」としてください。  

#### 3.4.3 Raspberry pi と isaax の紐付け

プロジェクトを作成した際にプロジェクトトークン画面が表示されます。  
画面下の「インストールスクリプト」をコピーして、Raspberry pi のターミナル上で実行してください。  

```bash:
curl -fsSL get.isaax.io | sh -s stable <トークン>
```

紐付けが完了すると、isaaxの画面上にRaspberry piの情報が出てくるようになります。  

次に、Raspberry piにGitHubリポジトリをcloneします。 


3.2で作成したGitHubのリポジトリのページを開き、右上の「Clone or download」をクリックします。  
URLが表示されるのでコピーして、以下のコマンドをRaspberry pi上で行なってください。  

```bash:
git clone コピーしたURL
```

#### 3.4.4 isaax動作確認

isaaxのダッシュボードから作成したプロジェクトを選択し、ページ下の「デバイス」項目から表示されているデバイスIDを選択してください。  
ページ右側のログに「Hello IoT from Isaax」が表示され続けていれば正常に動作しています。  

なお、画面上に「インターフェイス」項目があり、現在Raspberry piに割り当てられているIPアドレスを確認できるようになります。  

以上でGitHubとisaaxの初回設定は終了になります。  

### 4.開発までの手順  

これまでの手順を行うことで、【開発端末→GitHubへソースコードをアップロード→自動的にRaspberry piへ展開】という動作が行えるようになりました。  
そこで、今後の開発を行うにあたっての手順を簡単に記載します。  

```bash:
1. 作業ディレクトリへ移動(3.3.1で作成したディレクトリ)
2. Raspberry piで動作させる用のファイルを編集。この際、issax.jsonの編集も忘れないこと。
3. gitへ編集した内容をpushする。
   git add 編集したファイル名
   git commit -m "編集内容"
   git push origin master
4. isaaxのログを確認する。
```

### 5.Raspberry pi センサーについて

Raspberry piセンサーについてのサンプルコードは、以下のGitリポジトリに挙げています。
https://github.com/Koshizuka-lab/2019_DUCRB_Remocon_Kawakami.git

動作等については、Excelの参考リンク等を参考に確認してください。  
また、SensorKitのボックス内にDiscが入っています。その中には、Arduino用のサンプルコードも入っているので、そちらも参考にしてください。

以上！