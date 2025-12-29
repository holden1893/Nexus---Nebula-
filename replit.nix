{ pkgs }: {
  deps = [
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.nodejs_20
    pkgs.git
    pkgs.zip
    pkgs.libmagic
    pkgs.openssl
  ];
}
