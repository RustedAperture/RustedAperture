{
  description = "Dev shell for petbot (Node + yarn + sqlite3 build deps)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {inherit system;};
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22 # LTS Node.js compatible with discord.js v14
            yarn
            sqlite # libsqlite3 and headers for native builds
            pkg-config # Helps node-gyp find libraries
            python3 # node-gyp requirement
            gnumake # build toolchain
            gcc # C/C++ compiler for native modules
            libtool
            autoconf
            automake # common autotools used during native builds
          ];

          shellHook = ''
            echo "rusted dev shell ready: node $(node -v), yarn $(yarn -v)"
          '';
        };
      }
    );
}
