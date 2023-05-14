PGDMP         9                {        	   ProjektBD    15.2 (Ubuntu 15.2-1)    15.2 (Ubuntu 15.2-1) z    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16389 	   ProjektBD    DATABASE     w   CREATE DATABASE "ProjektBD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pl_PL.UTF-8';
    DROP DATABASE "ProjektBD";
                barte    false            �            1259    16480    appusers    TABLE     ~  CREATE TABLE public.appusers (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(1000) NOT NULL,
    class character varying(100) DEFAULT 'user'::character varying NOT NULL,
    status character varying(100) DEFAULT 'active'::character varying
);
    DROP TABLE public.appusers;
       public         heap    barte    false            �            1259    16487    appusers_id_seq    SEQUENCE     x   CREATE SEQUENCE public.appusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.appusers_id_seq;
       public          barte    false    214            �           0    0    appusers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.appusers_id_seq OWNED BY public.appusers.id;
          public          barte    false    215            �            1259    16581    case_documents    TABLE     �   CREATE TABLE public.case_documents (
    id_casdoc bigint NOT NULL,
    id_case_casdoc bigint NOT NULL,
    id_document_casdoc bigint NOT NULL
);
 "   DROP TABLE public.case_documents;
       public         heap    postgres    false            �            1259    16580    case_document_id_casdoc_seq    SEQUENCE     �   CREATE SEQUENCE public.case_document_id_casdoc_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.case_document_id_casdoc_seq;
       public          postgres    false    231            �           0    0    case_document_id_casdoc_seq    SEQUENCE OWNED BY     \   ALTER SEQUENCE public.case_document_id_casdoc_seq OWNED BY public.case_documents.id_casdoc;
          public          postgres    false    230            �            1259    16637 
   case_group    TABLE     �   CREATE TABLE public.case_group (
    id_casgrup bigint NOT NULL,
    id_case_casgrup bigint NOT NULL,
    id_group_casgrup bigint NOT NULL
);
    DROP TABLE public.case_group;
       public         heap    postgres    false            �            1259    16636    case_group_id_casgrup_seq    SEQUENCE     �   CREATE SEQUENCE public.case_group_id_casgrup_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.case_group_id_casgrup_seq;
       public          postgres    false    237            �           0    0    case_group_id_casgrup_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.case_group_id_casgrup_seq OWNED BY public.case_group.id_casgrup;
          public          postgres    false    236            �            1259    16571    casefile    TABLE     �   CREATE TABLE public.casefile (
    id_case bigint NOT NULL,
    opis_case character varying(1000) NOT NULL,
    id_group_case bigint,
    id_user_case bigint NOT NULL,
    title_case character varying(100) NOT NULL
);
    DROP TABLE public.casefile;
       public         heap    postgres    false            �            1259    16570    case_id_case_seq    SEQUENCE     y   CREATE SEQUENCE public.case_id_case_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.case_id_case_seq;
       public          postgres    false    229            �           0    0    case_id_case_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.case_id_case_seq OWNED BY public.casefile.id_case;
          public          postgres    false    228            �            1259    16654 	   case_user    TABLE     �   CREATE TABLE public.case_user (
    id_casusr bigint NOT NULL,
    id_case_casusr bigint NOT NULL,
    id_user_casusr bigint NOT NULL
);
    DROP TABLE public.case_user;
       public         heap    postgres    false            �            1259    16653    case_user_id_casusr_seq    SEQUENCE     �   CREATE SEQUENCE public.case_user_id_casusr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.case_user_id_casusr_seq;
       public          postgres    false    239            �           0    0    case_user_id_casusr_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.case_user_id_casusr_seq OWNED BY public.case_user.id_casusr;
          public          postgres    false    238            �            1259    16671    casefavourites    TABLE     �   CREATE TABLE public.casefavourites (
    id_casfav bigint NOT NULL,
    id_case_casfav bigint NOT NULL,
    id_user_casfav bigint NOT NULL
);
 "   DROP TABLE public.casefavourites;
       public         heap    postgres    false            �            1259    16670    casefavourites_id_casfav_seq    SEQUENCE     �   CREATE SEQUENCE public.casefavourites_id_casfav_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.casefavourites_id_casfav_seq;
       public          postgres    false    241            �           0    0    casefavourites_id_casfav_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.casefavourites_id_casfav_seq OWNED BY public.casefavourites.id_casfav;
          public          postgres    false    240            �            1259    16488    document_owner    TABLE     �   CREATE TABLE public.document_owner (
    id_owner_docown bigint NOT NULL,
    id_document_docown bigint NOT NULL,
    id_user_docown bigint NOT NULL
);
 "   DROP TABLE public.document_owner;
       public         heap    postgres    false            �            1259    16491    document_owner_doc_owner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.document_owner_doc_owner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.document_owner_doc_owner_id_seq;
       public          postgres    false    216            �           0    0    document_owner_doc_owner_id_seq    SEQUENCE OWNED BY     f   ALTER SEQUENCE public.document_owner_doc_owner_id_seq OWNED BY public.document_owner.id_owner_docown;
          public          postgres    false    217            �            1259    16492 	   documents    TABLE     �   CREATE TABLE public.documents (
    id_document bigint NOT NULL,
    title_document character varying(100) NOT NULL,
    note_document character varying(1000),
    date_document timestamp(6) with time zone NOT NULL,
    id_file_document bigint
);
    DROP TABLE public.documents;
       public         heap    postgres    false            �            1259    16497    documents_document_id_seq    SEQUENCE     �   CREATE SEQUENCE public.documents_document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.documents_document_id_seq;
       public          postgres    false    218            �           0    0    documents_document_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.documents_document_id_seq OWNED BY public.documents.id_document;
          public          postgres    false    219            �            1259    16498    file_archive_del    TABLE     �   CREATE TABLE public.file_archive_del (
    id_arch_filarchdel bigint NOT NULL,
    date_arch_filarchdel timestamp(6) with time zone NOT NULL,
    id_user_arch_filarchdel bigint NOT NULL,
    id_file_filarchdel bigint NOT NULL
);
 $   DROP TABLE public.file_archive_del;
       public         heap    barte    false            �            1259    16501     file_archive_id_file_archive_seq    SEQUENCE     �   CREATE SEQUENCE public.file_archive_id_file_archive_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.file_archive_id_file_archive_seq;
       public          barte    false    220            �           0    0     file_archive_id_file_archive_seq    SEQUENCE OWNED BY     l   ALTER SEQUENCE public.file_archive_id_file_archive_seq OWNED BY public.file_archive_del.id_arch_filarchdel;
          public          barte    false    221            �            1259    16502 
   file_owner    TABLE     �   CREATE TABLE public.file_owner (
    id_owner_filown bigint NOT NULL,
    id_user_filown integer NOT NULL,
    id_file_filown integer NOT NULL
);
    DROP TABLE public.file_owner;
       public         heap    barte    false            �            1259    16505    files    TABLE     (  CREATE TABLE public.files (
    id_file bigint NOT NULL,
    name_file character varying(100) NOT NULL,
    hashed_name_file character varying(300) NOT NULL,
    upload_timestamp timestamp(6) with time zone NOT NULL,
    size_file bigint NOT NULL,
    type_file character varying(10) NOT NULL
);
    DROP TABLE public.files;
       public         heap    barte    false            �            1259    16508    files_id_file_seq    SEQUENCE     z   CREATE SEQUENCE public.files_id_file_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.files_id_file_seq;
       public          barte    false    223            �           0    0    files_id_file_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.files_id_file_seq OWNED BY public.files.id_file;
          public          barte    false    224            �            1259    16586    groups    TABLE     �   CREATE TABLE public.groups (
    id_group bigint NOT NULL,
    name_group character varying(100) NOT NULL,
    creator_group bigint NOT NULL
);
    DROP TABLE public.groups;
       public         heap    postgres    false            �            1259    16585    group_id_group_seq    SEQUENCE     {   CREATE SEQUENCE public.group_id_group_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.group_id_group_seq;
       public          postgres    false    233            �           0    0    group_id_group_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.group_id_group_seq OWNED BY public.groups.id_group;
          public          postgres    false    232            �            1259    16593    group_users    TABLE     �   CREATE TABLE public.group_users (
    id_grpusr bigint NOT NULL,
    id_group_grpusr bigint NOT NULL,
    id_user_grpusr bigint NOT NULL
);
    DROP TABLE public.group_users;
       public         heap    postgres    false            �            1259    16592    group_users_id_grpusr_seq    SEQUENCE     �   CREATE SEQUENCE public.group_users_id_grpusr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.group_users_id_grpusr_seq;
       public          postgres    false    235            �           0    0    group_users_id_grpusr_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.group_users_id_grpusr_seq OWNED BY public.group_users.id_grpusr;
          public          postgres    false    234            �            1259    16509    owners_id_owner_seq    SEQUENCE     |   CREATE SEQUENCE public.owners_id_owner_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.owners_id_owner_seq;
       public          barte    false    222            �           0    0    owners_id_owner_seq    SEQUENCE OWNED BY     V   ALTER SEQUENCE public.owners_id_owner_seq OWNED BY public.file_owner.id_owner_filown;
          public          barte    false    225            �            1259    16510    users_archive_del    TABLE     �   CREATE TABLE public.users_archive_del (
    id_arch_usrarchdel bigint NOT NULL,
    date_arch_usrarchdel timestamp(6) with time zone NOT NULL,
    id_user_arch_usrarchdel bigint NOT NULL
);
 %   DROP TABLE public.users_archive_del;
       public         heap    postgres    false            �            1259    16513 (   users_archive_del_id_arch_usrarchdel_seq    SEQUENCE     �   CREATE SEQUENCE public.users_archive_del_id_arch_usrarchdel_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.users_archive_del_id_arch_usrarchdel_seq;
       public          postgres    false    226            �           0    0 (   users_archive_del_id_arch_usrarchdel_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.users_archive_del_id_arch_usrarchdel_seq OWNED BY public.users_archive_del.id_arch_usrarchdel;
          public          postgres    false    227            �           2604    16514    appusers id    DEFAULT     j   ALTER TABLE ONLY public.appusers ALTER COLUMN id SET DEFAULT nextval('public.appusers_id_seq'::regclass);
 :   ALTER TABLE public.appusers ALTER COLUMN id DROP DEFAULT;
       public          barte    false    215    214            �           2604    16584    case_documents id_casdoc    DEFAULT     �   ALTER TABLE ONLY public.case_documents ALTER COLUMN id_casdoc SET DEFAULT nextval('public.case_document_id_casdoc_seq'::regclass);
 G   ALTER TABLE public.case_documents ALTER COLUMN id_casdoc DROP DEFAULT;
       public          postgres    false    230    231    231            �           2604    16640    case_group id_casgrup    DEFAULT     ~   ALTER TABLE ONLY public.case_group ALTER COLUMN id_casgrup SET DEFAULT nextval('public.case_group_id_casgrup_seq'::regclass);
 D   ALTER TABLE public.case_group ALTER COLUMN id_casgrup DROP DEFAULT;
       public          postgres    false    237    236    237            �           2604    16657    case_user id_casusr    DEFAULT     z   ALTER TABLE ONLY public.case_user ALTER COLUMN id_casusr SET DEFAULT nextval('public.case_user_id_casusr_seq'::regclass);
 B   ALTER TABLE public.case_user ALTER COLUMN id_casusr DROP DEFAULT;
       public          postgres    false    239    238    239            �           2604    16674    casefavourites id_casfav    DEFAULT     �   ALTER TABLE ONLY public.casefavourites ALTER COLUMN id_casfav SET DEFAULT nextval('public.casefavourites_id_casfav_seq'::regclass);
 G   ALTER TABLE public.casefavourites ALTER COLUMN id_casfav DROP DEFAULT;
       public          postgres    false    241    240    241            �           2604    16574    casefile id_case    DEFAULT     p   ALTER TABLE ONLY public.casefile ALTER COLUMN id_case SET DEFAULT nextval('public.case_id_case_seq'::regclass);
 ?   ALTER TABLE public.casefile ALTER COLUMN id_case DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    16515    document_owner id_owner_docown    DEFAULT     �   ALTER TABLE ONLY public.document_owner ALTER COLUMN id_owner_docown SET DEFAULT nextval('public.document_owner_doc_owner_id_seq'::regclass);
 M   ALTER TABLE public.document_owner ALTER COLUMN id_owner_docown DROP DEFAULT;
       public          postgres    false    217    216            �           2604    16516    documents id_document    DEFAULT     ~   ALTER TABLE ONLY public.documents ALTER COLUMN id_document SET DEFAULT nextval('public.documents_document_id_seq'::regclass);
 D   ALTER TABLE public.documents ALTER COLUMN id_document DROP DEFAULT;
       public          postgres    false    219    218            �           2604    16517 #   file_archive_del id_arch_filarchdel    DEFAULT     �   ALTER TABLE ONLY public.file_archive_del ALTER COLUMN id_arch_filarchdel SET DEFAULT nextval('public.file_archive_id_file_archive_seq'::regclass);
 R   ALTER TABLE public.file_archive_del ALTER COLUMN id_arch_filarchdel DROP DEFAULT;
       public          barte    false    221    220            �           2604    16518    file_owner id_owner_filown    DEFAULT     }   ALTER TABLE ONLY public.file_owner ALTER COLUMN id_owner_filown SET DEFAULT nextval('public.owners_id_owner_seq'::regclass);
 I   ALTER TABLE public.file_owner ALTER COLUMN id_owner_filown DROP DEFAULT;
       public          barte    false    225    222            �           2604    16519    files id_file    DEFAULT     n   ALTER TABLE ONLY public.files ALTER COLUMN id_file SET DEFAULT nextval('public.files_id_file_seq'::regclass);
 <   ALTER TABLE public.files ALTER COLUMN id_file DROP DEFAULT;
       public          barte    false    224    223            �           2604    16596    group_users id_grpusr    DEFAULT     ~   ALTER TABLE ONLY public.group_users ALTER COLUMN id_grpusr SET DEFAULT nextval('public.group_users_id_grpusr_seq'::regclass);
 D   ALTER TABLE public.group_users ALTER COLUMN id_grpusr DROP DEFAULT;
       public          postgres    false    234    235    235            �           2604    16589    groups id_group    DEFAULT     q   ALTER TABLE ONLY public.groups ALTER COLUMN id_group SET DEFAULT nextval('public.group_id_group_seq'::regclass);
 >   ALTER TABLE public.groups ALTER COLUMN id_group DROP DEFAULT;
       public          postgres    false    233    232    233            �           2604    16520 $   users_archive_del id_arch_usrarchdel    DEFAULT     �   ALTER TABLE ONLY public.users_archive_del ALTER COLUMN id_arch_usrarchdel SET DEFAULT nextval('public.users_archive_del_id_arch_usrarchdel_seq'::regclass);
 S   ALTER TABLE public.users_archive_del ALTER COLUMN id_arch_usrarchdel DROP DEFAULT;
       public          postgres    false    227    226            �          0    16480    appusers 
   TABLE DATA           U   COPY public.appusers (id, name, surname, email, password, class, status) FROM stdin;
    public          barte    false    214   �       �          0    16581    case_documents 
   TABLE DATA           W   COPY public.case_documents (id_casdoc, id_case_casdoc, id_document_casdoc) FROM stdin;
    public          postgres    false    231   ڕ       �          0    16637 
   case_group 
   TABLE DATA           S   COPY public.case_group (id_casgrup, id_case_casgrup, id_group_casgrup) FROM stdin;
    public          postgres    false    237   9�       �          0    16654 	   case_user 
   TABLE DATA           N   COPY public.case_user (id_casusr, id_case_casusr, id_user_casusr) FROM stdin;
    public          postgres    false    239   e�       �          0    16671    casefavourites 
   TABLE DATA           S   COPY public.casefavourites (id_casfav, id_case_casfav, id_user_casfav) FROM stdin;
    public          postgres    false    241   ��       �          0    16571    casefile 
   TABLE DATA           _   COPY public.casefile (id_case, opis_case, id_group_case, id_user_case, title_case) FROM stdin;
    public          postgres    false    229   ��       �          0    16488    document_owner 
   TABLE DATA           ]   COPY public.document_owner (id_owner_docown, id_document_docown, id_user_docown) FROM stdin;
    public          postgres    false    216   i�       �          0    16492 	   documents 
   TABLE DATA           p   COPY public.documents (id_document, title_document, note_document, date_document, id_file_document) FROM stdin;
    public          postgres    false    218   ��       �          0    16498    file_archive_del 
   TABLE DATA           �   COPY public.file_archive_del (id_arch_filarchdel, date_arch_filarchdel, id_user_arch_filarchdel, id_file_filarchdel) FROM stdin;
    public          barte    false    220   n�       �          0    16502 
   file_owner 
   TABLE DATA           U   COPY public.file_owner (id_owner_filown, id_user_filown, id_file_filown) FROM stdin;
    public          barte    false    222   ��       �          0    16505    files 
   TABLE DATA           m   COPY public.files (id_file, name_file, hashed_name_file, upload_timestamp, size_file, type_file) FROM stdin;
    public          barte    false    223   �       �          0    16593    group_users 
   TABLE DATA           Q   COPY public.group_users (id_grpusr, id_group_grpusr, id_user_grpusr) FROM stdin;
    public          postgres    false    235   .�       �          0    16586    groups 
   TABLE DATA           E   COPY public.groups (id_group, name_group, creator_group) FROM stdin;
    public          postgres    false    233   g�       �          0    16510    users_archive_del 
   TABLE DATA           n   COPY public.users_archive_del (id_arch_usrarchdel, date_arch_usrarchdel, id_user_arch_usrarchdel) FROM stdin;
    public          postgres    false    226   ��       �           0    0    appusers_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.appusers_id_seq', 16, true);
          public          barte    false    215            �           0    0    case_document_id_casdoc_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.case_document_id_casdoc_seq', 23, true);
          public          postgres    false    230            �           0    0    case_group_id_casgrup_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.case_group_id_casgrup_seq', 3, true);
          public          postgres    false    236            �           0    0    case_id_case_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.case_id_case_seq', 13, true);
          public          postgres    false    228            �           0    0    case_user_id_casusr_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.case_user_id_casusr_seq', 6, true);
          public          postgres    false    238            �           0    0    casefavourites_id_casfav_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.casefavourites_id_casfav_seq', 1, false);
          public          postgres    false    240            �           0    0    document_owner_doc_owner_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.document_owner_doc_owner_id_seq', 85, true);
          public          postgres    false    217            �           0    0    documents_document_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.documents_document_id_seq', 65, true);
          public          postgres    false    219            �           0    0     file_archive_id_file_archive_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.file_archive_id_file_archive_seq', 13, true);
          public          barte    false    221            �           0    0    files_id_file_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.files_id_file_seq', 88, true);
          public          barte    false    224            �           0    0    group_id_group_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.group_id_group_seq', 5, true);
          public          postgres    false    232            �           0    0    group_users_id_grpusr_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.group_users_id_grpusr_seq', 7, true);
          public          postgres    false    234            �           0    0    owners_id_owner_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.owners_id_owner_seq', 93, true);
          public          barte    false    225            �           0    0 (   users_archive_del_id_arch_usrarchdel_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.users_archive_del_id_arch_usrarchdel_seq', 23, true);
          public          postgres    false    227            �           2606    16522    appusers appusers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.appusers
    ADD CONSTRAINT appusers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.appusers DROP CONSTRAINT appusers_pkey;
       public            barte    false    214            �           2606    16630 "   case_documents case_documents_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.case_documents
    ADD CONSTRAINT case_documents_pkey PRIMARY KEY (id_casdoc);
 L   ALTER TABLE ONLY public.case_documents DROP CONSTRAINT case_documents_pkey;
       public            postgres    false    231            �           2606    16642    case_group case_group_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.case_group
    ADD CONSTRAINT case_group_pkey PRIMARY KEY (id_casgrup);
 D   ALTER TABLE ONLY public.case_group DROP CONSTRAINT case_group_pkey;
       public            postgres    false    237            �           2606    16578    casefile case_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.casefile
    ADD CONSTRAINT case_pkey PRIMARY KEY (id_case);
 <   ALTER TABLE ONLY public.casefile DROP CONSTRAINT case_pkey;
       public            postgres    false    229            �           2606    16659    case_user case_user_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.case_user
    ADD CONSTRAINT case_user_pkey PRIMARY KEY (id_casusr);
 B   ALTER TABLE ONLY public.case_user DROP CONSTRAINT case_user_pkey;
       public            postgres    false    239            �           2606    16676 "   casefavourites casefavourites_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.casefavourites
    ADD CONSTRAINT casefavourites_pkey PRIMARY KEY (id_casfav);
 L   ALTER TABLE ONLY public.casefavourites DROP CONSTRAINT casefavourites_pkey;
       public            postgres    false    241            �           2606    16524 "   document_owner document_owner_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT document_owner_pkey PRIMARY KEY (id_owner_docown);
 L   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT document_owner_pkey;
       public            postgres    false    216            �           2606    16526    documents documents_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id_document);
 B   ALTER TABLE ONLY public.documents DROP CONSTRAINT documents_pkey;
       public            postgres    false    218            �           2606    16528 "   file_archive_del file_archive_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT file_archive_pkey PRIMARY KEY (id_arch_filarchdel);
 L   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT file_archive_pkey;
       public            barte    false    220            �           2606    16530    files files_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id_file);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            barte    false    223            �           2606    16591    groups group_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT group_pkey PRIMARY KEY (id_group);
 ;   ALTER TABLE ONLY public.groups DROP CONSTRAINT group_pkey;
       public            postgres    false    233            �           2606    16598    group_users group_users_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT group_users_pkey PRIMARY KEY (id_grpusr);
 F   ALTER TABLE ONLY public.group_users DROP CONSTRAINT group_users_pkey;
       public            postgres    false    235            �           2606    16532    file_owner owners_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.file_owner
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id_owner_filown);
 @   ALTER TABLE ONLY public.file_owner DROP CONSTRAINT owners_pkey;
       public            barte    false    222            �           2606    16534 (   users_archive_del users_archive_del_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.users_archive_del
    ADD CONSTRAINT users_archive_del_pkey PRIMARY KEY (id_arch_usrarchdel);
 R   ALTER TABLE ONLY public.users_archive_del DROP CONSTRAINT users_archive_del_pkey;
       public            postgres    false    226            �           2606    16631    groups creator_group_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT creator_group_fk FOREIGN KEY (creator_group) REFERENCES public.appusers(id) NOT VALID;
 A   ALTER TABLE ONLY public.groups DROP CONSTRAINT creator_group_fk;
       public          postgres    false    214    3281    233            �           2606    16619     case_documents id_case_casdoc_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_documents
    ADD CONSTRAINT id_case_casdoc_fk FOREIGN KEY (id_case_casdoc) REFERENCES public.casefile(id_case) NOT VALID;
 J   ALTER TABLE ONLY public.case_documents DROP CONSTRAINT id_case_casdoc_fk;
       public          postgres    false    3295    231    229            �           2606    16677     casefavourites id_case_casfav_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.casefavourites
    ADD CONSTRAINT id_case_casfav_fk FOREIGN KEY (id_case_casfav) REFERENCES public.casefile(id_case) NOT VALID;
 J   ALTER TABLE ONLY public.casefavourites DROP CONSTRAINT id_case_casfav_fk;
       public          postgres    false    229    3295    241            �           2606    16643    case_group id_case_casgrup_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_group
    ADD CONSTRAINT id_case_casgrup_fk FOREIGN KEY (id_case_casgrup) REFERENCES public.casefile(id_case) NOT VALID;
 G   ALTER TABLE ONLY public.case_group DROP CONSTRAINT id_case_casgrup_fk;
       public          postgres    false    237    3295    229            �           2606    16660    case_user id_case_casusr_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_user
    ADD CONSTRAINT id_case_casusr_fk FOREIGN KEY (id_case_casusr) REFERENCES public.casefile(id_case) NOT VALID;
 E   ALTER TABLE ONLY public.case_user DROP CONSTRAINT id_case_casusr_fk;
       public          postgres    false    3295    229    239            �           2606    16624 $   case_documents id_document_casdoc_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_documents
    ADD CONSTRAINT id_document_casdoc_fk FOREIGN KEY (id_document_casdoc) REFERENCES public.documents(id_document) NOT VALID;
 N   ALTER TABLE ONLY public.case_documents DROP CONSTRAINT id_document_casdoc_fk;
       public          postgres    false    3285    218    231            �           2606    16535 $   document_owner id_document_docown_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT id_document_docown_fk FOREIGN KEY (id_document_docown) REFERENCES public.documents(id_document) NOT VALID;
 N   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT id_document_docown_fk;
       public          postgres    false    218    216    3285            �           2606    16540     file_archive_del id_file_arch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT id_file_arch_fk FOREIGN KEY (id_file_filarchdel) REFERENCES public.files(id_file) NOT VALID;
 J   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT id_file_arch_fk;
       public          barte    false    3291    223    220            �           2606    16609    casefile id_group_case_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.casefile
    ADD CONSTRAINT id_group_case_fk FOREIGN KEY (id_group_case) REFERENCES public.groups(id_group) NOT VALID;
 C   ALTER TABLE ONLY public.casefile DROP CONSTRAINT id_group_case_fk;
       public          postgres    false    233    3299    229            �           2606    16648    case_group id_group_casgrup_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_group
    ADD CONSTRAINT id_group_casgrup_fk FOREIGN KEY (id_group_casgrup) REFERENCES public.groups(id_group) NOT VALID;
 H   ALTER TABLE ONLY public.case_group DROP CONSTRAINT id_group_casgrup_fk;
       public          postgres    false    237    233    3299            �           2606    16604    group_users id_group_grpusr_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT id_group_grpusr_fk FOREIGN KEY (id_group_grpusr) REFERENCES public.groups(id_group) NOT VALID;
 H   ALTER TABLE ONLY public.group_users DROP CONSTRAINT id_group_grpusr_fk;
       public          postgres    false    3299    233    235            �           2606    16545     file_archive_del id_user_arch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT id_user_arch_fk FOREIGN KEY (id_user_arch_filarchdel) REFERENCES public.appusers(id) NOT VALID;
 J   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT id_user_arch_fk;
       public          barte    false    3281    214    220            �           2606    16614    casefile id_user_case_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.casefile
    ADD CONSTRAINT id_user_case_fk FOREIGN KEY (id_user_case) REFERENCES public.appusers(id) NOT VALID;
 B   ALTER TABLE ONLY public.casefile DROP CONSTRAINT id_user_case_fk;
       public          postgres    false    229    214    3281            �           2606    16682     casefavourites id_user_casfav_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.casefavourites
    ADD CONSTRAINT id_user_casfav_fk FOREIGN KEY (id_user_casfav) REFERENCES public.appusers(id) NOT VALID;
 J   ALTER TABLE ONLY public.casefavourites DROP CONSTRAINT id_user_casfav_fk;
       public          postgres    false    3281    214    241            �           2606    16665    case_user id_user_casusr_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_user
    ADD CONSTRAINT id_user_casusr_fk FOREIGN KEY (id_user_casusr) REFERENCES public.appusers(id) NOT VALID;
 E   ALTER TABLE ONLY public.case_user DROP CONSTRAINT id_user_casusr_fk;
       public          postgres    false    214    239    3281            �           2606    16550     document_owner id_user_docown_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT id_user_docown_fk FOREIGN KEY (id_user_docown) REFERENCES public.appusers(id) NOT VALID;
 J   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT id_user_docown_fk;
       public          postgres    false    3281    214    216            �           2606    16599    group_users id_user_grpusr_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT id_user_grpusr_fk FOREIGN KEY (id_user_grpusr) REFERENCES public.appusers(id) NOT VALID;
 G   ALTER TABLE ONLY public.group_users DROP CONSTRAINT id_user_grpusr_fk;
       public          postgres    false    235    214    3281            �           2606    16555     users_archive_del id_userarch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_archive_del
    ADD CONSTRAINT id_userarch_fk FOREIGN KEY (id_user_arch_usrarchdel) REFERENCES public.appusers(id);
 J   ALTER TABLE ONLY public.users_archive_del DROP CONSTRAINT id_userarch_fk;
       public          postgres    false    214    226    3281            �           2606    16560    file_owner owners_id_file_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_owner
    ADD CONSTRAINT owners_id_file_fkey FOREIGN KEY (id_file_filown) REFERENCES public.files(id_file);
 H   ALTER TABLE ONLY public.file_owner DROP CONSTRAINT owners_id_file_fkey;
       public          barte    false    223    222    3291            �           2606    16565    file_owner owners_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_owner
    ADD CONSTRAINT owners_id_user_fkey FOREIGN KEY (id_user_filown) REFERENCES public.appusers(id);
 H   ALTER TABLE ONLY public.file_owner DROP CONSTRAINT owners_id_user_fkey;
       public          barte    false    3281    222    214            �   �   x�}��
�@������v
�Ĵ.��:�;&u�-z�z�T�"���1?Ɵ@���rO	�.�`�J]�l�Թ'�@�L�.� ޢd}R��R[���׵��|X�Aw����0��g
�	���j���yS�4���v���2h�q%��f��E�Օ�<����O���w1      �   O   x����0�PLƒ|Ľ��:�x�� ]�d���,F�W���&-�AfC�6� �Bgm���ð�a�̄^j�eX��?h#      �      x�3�4�4�2�&\�@Ґ+F��� "��      �   '   x�3�4�44�2�44�� .�	��c
4��1z\\\ ��w      �      x������ � �      �   �   x�3���Vr����4���,���Pd��,9�2����+��� ^��1���_>P<�E�	��!gTjqQ�Ѧ|���#3ʋ�*�K�� 
�ҁ2�U�y��
@E��\�F�%��%
 �S.CcΔ�D7G��D�8������ �T?�      �   ;   x�5��  ���0�Rz���T�e�r|@YTƂ����Q��8j��_��ո����      �   �   x�u�A�0���)v����ݦ;�H1��4���geEH�����S@�d�g�#[e��6Is�u�;;5�r`�6\��B ��*�	l��Ӈ�L)y����T���=#I��v�e�S����� j#���h��ɺ�C1��j�k�����F �LΉSJ��F7      �   =   x�34�4202�50�50Q02�2��26�60�4�0�24FH[(ZYZB�M�b���� �9u      �   6   x��� 0�0Lk��K������0ȩ����"(5���X6�����.�4�	Z      �     x�m�;nA���SL�vT�~To	X& AB���fm�]��Z�!�C �AJd_�^�F��&���U�'<���>m��w�Y��Cի��4�F\�;�R��}�f%�E�1��[��1��D>G�]��|����;��W �D�hv��P�7���r��~����ݯ��������땍�����߻����׺��7{�����9��r}�;��KMru�i��R�C��ħ�
y����M�֘�� NZ�i[��䲢8�yHñj!~��`�O����8�A3@+}tb�5�#F���;'�z��J ���T��D�\amd���#��(���S�n����浝-),�-����M"R��B�=־"K��=�h�g6�\["�V��h�CF��������G�G�8��}�x��-kvX4Ik��II�0 �����-��2T�Q�Ql^��s�aa"I���Dt�bex���usy���l���@�'(�H��N[3�Һ����/�A#tF�5������ 0NQ�������~���_@'�      �   )   x�3�4�4�2��\& ʘ˔��3Q\� Ҙ+F��� �[�      �   4   x�3�I-.�4�23��Lc��4�0M�LS΀�Ԥb#= /F��� ��H      �   �   x�e���0�s4��E
R�$�,���M������$bQ���^	O���BNH��&����I��#M{�'l�]j�uZ�h��q&C�ϸ��z�1
jZ�d�7LCz�S�W�r�����M��Qж����T���ب�	��SD�o�He     