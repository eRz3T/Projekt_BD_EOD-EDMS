PGDMP         (                {        	   ProjektBD    15.2    15.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16399 	   ProjektBD    DATABASE     ~   CREATE DATABASE "ProjektBD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Polish_Poland.1250';
    DROP DATABASE "ProjektBD";
                barte    false            �            1259    16400    appusers    TABLE     7  CREATE TABLE public.appusers (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(1000) NOT NULL,
    class character varying(100) DEFAULT 'user'::character varying NOT NULL
);
    DROP TABLE public.appusers;
       public         heap    barte    false            �            1259    16406    appusers_id_seq    SEQUENCE     x   CREATE SEQUENCE public.appusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.appusers_id_seq;
       public          barte    false    214                       0    0    appusers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.appusers_id_seq OWNED BY public.appusers.id;
          public          barte    false    215            �            1259    16411    files    TABLE     (  CREATE TABLE public.files (
    id_file bigint NOT NULL,
    name_file character varying(100) NOT NULL,
    hashed_name_file character varying(300) NOT NULL,
    upload_timestamp timestamp(6) with time zone NOT NULL,
    size_file bigint NOT NULL,
    type_file character varying(10) NOT NULL
);
    DROP TABLE public.files;
       public         heap    barte    false            �            1259    16410    files_id_file_seq    SEQUENCE     z   CREATE SEQUENCE public.files_id_file_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.files_id_file_seq;
       public          barte    false    217                       0    0    files_id_file_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.files_id_file_seq OWNED BY public.files.id_file;
          public          barte    false    216            �            1259    16442    owners    TABLE     y   CREATE TABLE public.owners (
    id_owner bigint NOT NULL,
    id_user integer NOT NULL,
    id_file integer NOT NULL
);
    DROP TABLE public.owners;
       public         heap    barte    false            �            1259    16441    owners_id_owner_seq    SEQUENCE     |   CREATE SEQUENCE public.owners_id_owner_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.owners_id_owner_seq;
       public          barte    false    219                       0    0    owners_id_owner_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.owners_id_owner_seq OWNED BY public.owners.id_owner;
          public          barte    false    218            o           2604    16407    appusers id    DEFAULT     j   ALTER TABLE ONLY public.appusers ALTER COLUMN id SET DEFAULT nextval('public.appusers_id_seq'::regclass);
 :   ALTER TABLE public.appusers ALTER COLUMN id DROP DEFAULT;
       public          barte    false    215    214            q           2604    16414    files id_file    DEFAULT     n   ALTER TABLE ONLY public.files ALTER COLUMN id_file SET DEFAULT nextval('public.files_id_file_seq'::regclass);
 <   ALTER TABLE public.files ALTER COLUMN id_file DROP DEFAULT;
       public          barte    false    216    217    217            r           2604    16445    owners id_owner    DEFAULT     r   ALTER TABLE ONLY public.owners ALTER COLUMN id_owner SET DEFAULT nextval('public.owners_id_owner_seq'::regclass);
 >   ALTER TABLE public.owners ALTER COLUMN id_owner DROP DEFAULT;
       public          barte    false    219    218    219            	          0    16400    appusers 
   TABLE DATA           M   COPY public.appusers (id, name, surname, email, password, class) FROM stdin;
    public          barte    false    214   J                 0    16411    files 
   TABLE DATA           m   COPY public.files (id_file, name_file, hashed_name_file, upload_timestamp, size_file, type_file) FROM stdin;
    public          barte    false    217   �                 0    16442    owners 
   TABLE DATA           <   COPY public.owners (id_owner, id_user, id_file) FROM stdin;
    public          barte    false    219   �                  0    0    appusers_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.appusers_id_seq', 5, true);
          public          barte    false    215                       0    0    files_id_file_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.files_id_file_seq', 26, true);
          public          barte    false    216                       0    0    owners_id_owner_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.owners_id_owner_seq', 13, true);
          public          barte    false    218            t           2606    16409    appusers appusers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.appusers
    ADD CONSTRAINT appusers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.appusers DROP CONSTRAINT appusers_pkey;
       public            barte    false    214            v           2606    16416    files files_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id_file);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            barte    false    217            x           2606    16447    owners owners_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id_owner);
 <   ALTER TABLE ONLY public.owners DROP CONSTRAINT owners_pkey;
       public            barte    false    219            y           2606    16453    owners owners_id_file_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_id_file_fkey FOREIGN KEY (id_file) REFERENCES public.files(id_file);
 D   ALTER TABLE ONLY public.owners DROP CONSTRAINT owners_id_file_fkey;
       public          barte    false    3190    217    219            z           2606    16448    owners owners_id_user_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.appusers(id);
 D   ALTER TABLE ONLY public.owners DROP CONSTRAINT owners_id_user_fkey;
       public          barte    false    219    3188    214            	   ?   x�3�tJ,*I��tN-I-J�L�����s3s���s9K�S���1gIjq	���(F��� <z?            x������ � �            x������ � �     