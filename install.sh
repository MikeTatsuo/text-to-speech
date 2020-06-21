#!/bin/bash
#
# Script pra criar o banco de dados
# Autor: Mike Tatsuo
# Github: https://github.com/MikeTatsuo/
#

#
# Variáveis
#
MYSQL=$(which mysql)
MYSQL_CONFIG_EDITOR=$(which mysql_config_editor)
NODE=$(which node)
NPM=$(which npm)
BASH_FILE="${HOME}/.bashrc"
LOGIN_FILE="${HOME}/.mylogin.cnf"
DB="smarkio"
TABLE="texts"

#
# Verifica se as dependências estão instaladas
#
check_dependencies() {
  echo "Verificando se os programas necessários estão instalados"
  check_mysql
  check_node
}

#
# Verifica se o MySQL está instalado
#
check_mysql() {
  echo -n "MySQL: "
  if [ -z $MYSQL ]; then
    echo "não instalado"
    MISSING="MySQL\n"
  else
    echo "$MYSQL"
  fi
}

#
# Verifica se o MySQL está instalado
#
check_node() {
  echo -n "Node: "
  if [ -z $NODE ]; then
    echo "não instalado"
    MISSING="$MISSING\nnode"
  else
    echo "$NODE"
  fi
}

#
# Função pra solicitar nome de usuário com acesso para criar um banco de dados no MySQL
#
request_access() {
  echo -e "\nInforme o nome do usuário e senha com permissão para criar o banco de dados."
  echo -n "Username (pressione Enter se for utilizar o 'root'): "
  read ROOT

  if [ -z ${ROOT} ]; then
    ROOT='root'
  fi

  save_login_data
}

#
# Salva os dados de login no arquivo .mylogin.cnf
#
save_login_data() {
  if [ -f "${LOGIN_FILE}" ]; then
    $MYSQL_CONFIG_EDITOR remove --login-path=smarkio
  fi

  $MYSQL_CONFIG_EDITOR set --login-path=smarkio --host=localhost --user=${ROOT} --password
}

#
# Função para criar um usuário só com a permissão pra SELECT e INSERT
#
create_user() {
  echo -e "\nUsuário que será criado para acessar o banco de dados através da aplicação."
  echo -n "Username(@localhost): "
  read DB_USER

  if [ -z ${DB_USER} ]; then
    echo "Username não pode ser vazio."
    create_user
  fi

  DB_USER="'${DB_USER}'@'localhost'"
  create_user_passwd
}

#
# Função pra criar uma senha para o usuário como acesso restrito
#
create_user_passwd() {
  echo -n "Senha: "
  read -s DB_USER_PASSWD

  if [ -z ${DB_USER_PASSWD} ]; then
    echo -e "\nSenha não pode ser vazio."
    create_user_passwd
  fi

  # create_db
}

#
# Função para criar o banco de dados, a tabela, usuário e alguns ajustes
#
create_db() {
  DB_QUERY_1="CREATE DATABASE IF NOT EXISTS ${DB};"
  DB_QUERY_2="USE ${DB};"

  TABLE_QUERY="CREATE TABLE IF NOT EXISTS ${TABLE} ( id SMALLINT AUTO_INCREMENT NOT NULL, text VARCHAR(255) NOT NULL, PRIMARY KEY(id) );"

  USER_QUERY_1="UPDATE mysql.user SET Grant_priv='Y' WHERE User='${ROOT}';"
  USER_QUERY_2="FLUSH PRIVILEGES;"
  USER_QUERY_3="CREATE USER IF NOT EXISTS ${DB_USER} IDENTIFIED BY '${DB_USER_PASSWD}';"
  USER_QUERY_4="GRANT SELECT, INSERT ON ${DB}.* TO ${DB_USER};"
  USER_QUERY_5="ALTER USER ${DB_USER} IDENTIFIED WITH mysql_native_password BY '${DB_USER_PASSWD}';"

  QUERY="${DB_QUERY_1}${DB_QUERY_2}${TABLE_QUERY}${USER_QUERY_1}${USER_QUERY_2}${USER_QUERY_3}${USER_QUERY_4}${USER_QUERY_5}${USER_QUERY_2}"

  $MYSQL --login-path=smarkio -e "${QUERY}"

  save_on_bashrc
}

#
# Função para gravar no arquivo .bashrc do usuário as variáveis de ambiente
#
save_on_bashrc() {
  echo -e '\nSalvando as informações nas variáveis de ambiente'

  if [ ! -f "${BASH_FILE}" ]; then
    touch $BASH_FILE
  fi

  if [ ! -w "${BASH_FILE}" ]; then
    chmod 664 $BASH_FILE
  fi

  echo -e "\n# Usuário e senha para o MySQL smarkio" >>$BASH_FILE
  echo "export SMARKIO_USER=${DB_USER}" >>$BASH_FILE
  echo "export SMARKIO_PASSWD=${DB_USER_PASSWD}" >>$BASH_FILE
  echo "export SMARKIO_DB=${DB}" >>$BASH_FILE
  echo "export SMARKIO_HOST='localhost'" >>$BASH_FILE

  source $BASH_FILE
}

#
# Iniciando o Script
#

start() {
  check_dependencies

  if [ -n "${MISSING}" ]; then
    echo -e "\nInterropendo a execução, instale os seguintes programas antes de executar novamente"
    echo -e "$MISSING"
    exit
  fi

  request_access
  create_user
  create_db
}

#
# Start
#
start
