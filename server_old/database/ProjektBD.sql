PGDMP     !    3                {        	   ProjektBD    15.2    15.2 )    &           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            '           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            (           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            )           1262    16389 	   ProjektBD    DATABASE     w   CREATE DATABASE "ProjektBD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE "ProjektBD";
                barte    false            �            1259    16390    appusers    TABLE     7  CREATE TABLE public.appusers (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(1000) NOT NULL,
    class character varying(100) DEFAULT 'user'::character varying NOT NULL
);
    DROP TABLE public.appusers;
       public         heap    barte    false            �            1259    16396    appusers_id_seq    SEQUENCE     x   CREATE SEQUENCE public.appusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.appusers_id_seq;
       public          barte    false    214            *           0    0    appusers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.appusers_id_seq OWNED BY public.appusers.id;
          public          barte    false    215            �            1259    16432 	   documents    TABLE     �   CREATE TABLE public.documents (
    document_id bigint NOT NULL,
    user_id bigint NOT NULL,
    document_title character varying(100) NOT NULL,
    note character varying(1000),
    date timestamp(6) with time zone NOT NULL
);
    DROP TABLE public.documents;
       public         heap    postgres    false            �            1259    16431    documents_document_id_seq    SEQUENCE     �   CREATE SEQUENCE public.documents_document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.documents_document_id_seq;
       public          postgres    false    223            +           0    0    documents_document_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.documents_document_id_seq OWNED BY public.documents.document_id;
          public          postgres    false    222            �            1259    16397    file_archive_del    TABLE     �   CREATE TABLE public.file_archive_del (
    id_file_archive bigint NOT NULL,
    date_arch timestamp(6) with time zone NOT NULL,
    id_user_arch bigint NOT NULL,
    file_id bigint NOT NULL
);
 $   DROP TABLE public.file_archive_del;
       public         heap    barte    false            �            1259    16400     file_archive_id_file_archive_seq    SEQUENCE     �   CREATE SEQUENCE public.file_archive_id_file_archive_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.file_archive_id_file_archive_seq;
       public          barte    false    216            ,           0    0     file_archive_id_file_archive_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.file_archive_id_file_archive_seq OWNED BY public.file_archive_del.id_file_archive;
          public          barte    false    217            �            1259    16401    files    TABLE     (  CREATE TABLE public.files (
    id_file bigint NOT NULL,
    name_file character varying(100) NOT NULL,
    hashed_name_file character varying(300) NOT NULL,
    upload_timestamp timestamp(6) with time zone NOT NULL,
    size_file bigint NOT NULL,
    type_file character varying(10) NOT NULL
);
    DROP TABLE public.files;
       public         heap    barte    false            �            1259    16404    files_id_file_seq    SEQUENCE     z   CREATE SEQUENCE public.files_id_file_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.files_id_file_seq;
       public          barte    false    218            -           0    0    files_id_file_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.files_id_file_seq OWNED BY public.files.id_file;
          public          barte    false    219            �            1259    16405    owners    TABLE     y   CREATE TABLE public.owners (
    id_owner bigint NOT NULL,
    id_user integer NOT NULL,
    id_file integer NOT NULL
);
    DROP TABLE public.owners;
       public         heap    barte    false            �            1259    16408    owners_id_owner_seq    SEQUENCE     |   CREATE SEQUENCE public.owners_id_owner_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.owners_id_owner_seq;
       public          barte    false    220            .           0    0    owners_id_owner_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.owners_id_owner_seq OWNED BY public.owners.id_owner;
          public          barte    false    221            z           2604    16409    appusers id    DEFAULT     j   ALTER TABLE ONLY public.appusers ALTER COLUMN id SET DEFAULT nextval('public.appusers_id_seq'::regclass);
 :   ALTER TABLE public.appusers ALTER COLUMN id DROP DEFAULT;
       public          barte    false    215    214                       2604    16435    documents document_id    DEFAULT     ~   ALTER TABLE ONLY public.documents ALTER COLUMN document_id SET DEFAULT nextval('public.documents_document_id_seq'::regclass);
 D   ALTER TABLE public.documents ALTER COLUMN document_id DROP DEFAULT;
       public          postgres    false    223    222    223            |           2604    16410     file_archive_del id_file_archive    DEFAULT     �   ALTER TABLE ONLY public.file_archive_del ALTER COLUMN id_file_archive SET DEFAULT nextval('public.file_archive_id_file_archive_seq'::regclass);
 O   ALTER TABLE public.file_archive_del ALTER COLUMN id_file_archive DROP DEFAULT;
       public          barte    false    217    216            }           2604    16411    files id_file    DEFAULT     n   ALTER TABLE ONLY public.files ALTER COLUMN id_file SET DEFAULT nextval('public.files_id_file_seq'::regclass);
 <   ALTER TABLE public.files ALTER COLUMN id_file DROP DEFAULT;
       public          barte    false    219    218            ~           2604    16412    owners id_owner    DEFAULT     r   ALTER TABLE ONLY public.owners ALTER COLUMN id_owner SET DEFAULT nextval('public.owners_id_owner_seq'::regclass);
 >   ALTER TABLE public.owners ALTER COLUMN id_owner DROP DEFAULT;
       public          barte    false    221    220                      0    16390    appusers 
   TABLE DATA           M   COPY public.appusers (id, name, surname, email, password, class) FROM stdin;
    public          barte    false    214   .       #          0    16432 	   documents 
   TABLE DATA           U   COPY public.documents (document_id, user_id, document_title, note, date) FROM stdin;
    public          postgres    false    223   c.                 0    16397    file_archive_del 
   TABLE DATA           ]   COPY public.file_archive_del (id_file_archive, date_arch, id_user_arch, file_id) FROM stdin;
    public          barte    false    216   �.                 0    16401    files 
   TABLE DATA           m   COPY public.files (id_file, name_file, hashed_name_file, upload_timestamp, size_file, type_file) FROM stdin;
    public          barte    false    218   �.                  0    16405    owners 
   TABLE DATA           <   COPY public.owners (id_owner, id_user, id_file) FROM stdin;
    public          barte    false    220   �0       /           0    0    appusers_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.appusers_id_seq', 5, true);
          public          barte    false    215            0           0    0    documents_document_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.documents_document_id_seq', 1, false);
          public          postgres    false    222            1           0    0     file_archive_id_file_archive_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.file_archive_id_file_archive_seq', 8, true);
          public          barte    false    217            2           0    0    files_id_file_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.files_id_file_seq', 39, true);
          public          barte    false    219            3           0    0    owners_id_owner_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.owners_id_owner_seq', 26, true);
          public          barte    false    221            �           2606    16414    appusers appusers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.appusers
    ADD CONSTRAINT appusers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.appusers DROP CONSTRAINT appusers_pkey;
       public            barte    false    214            �           2606    16439    documents documents_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (document_id);
 B   ALTER TABLE ONLY public.documents DROP CONSTRAINT documents_pkey;
       public            postgres    false    223            �           2606    16416 "   file_archive_del file_archive_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT file_archive_pkey PRIMARY KEY (id_file_archive);
 L   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT file_archive_pkey;
       public            barte    false    216            �           2606    16418    files files_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id_file);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            barte    false    218            �           2606    16420    owners owners_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id_owner);
 <   ALTER TABLE ONLY public.owners DROP CONSTRAINT owners_pkey;
       public            barte    false    220            �           2606    16421    owners owners_id_file_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_id_file_fkey FOREIGN KEY (id_file) REFERENCES public.files(id_file);
 D   ALTER TABLE ONLY public.owners DROP CONSTRAINT owners_id_file_fkey;
       public          barte    false    220    218    4229            �           2606    16426    owners owners_id_user_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.appusers(id);
 D   ALTER TABLE ONLY public.owners DROP CONSTRAINT owners_id_user_fkey;
       public          barte    false    4225    220    214               ?   x�3�tJ,*I��tN-I-J�L�����s3s���s9K�S���1gIjq	���(F��� <z?      #      x������ � �         S   x�e���0C�s<�qRJfa�9(RR9ZO�.�Ƣ^�Ֆ�i:�T�!��(�D[����:�W�� ��苺f�ԆkpE"�         �  x���;jAE�Uhj��ө�� �ck��M`3��a�}޹�Ҕ���7}# ~�"+h�b�	A��X�|��\k���b�f� �D��1ڨs���X��-�W��S�<HmR�r�va���~{�U������K�j,��A#�V��#���g��U��h�D�6���	�>!N��5o#�d�}�Z�8N�4����r�l�����V:��-�_�Pƺ������ݼ"� �s�[������#\K�⣧-w�!�S���^K�+��j6]-܆Ց5�.Z�2}g��/��e�r�HЭ_,|GZiQ��Lh��є��X2̺q�,�j�	��GmX1q&E����^Ŗ�-�eS�H/Mw5�ܻڒ���Rv��<���� �m_�L����ޒ��$�6��;{�#�,�j���2K��Vw�ŗ��M�+=q�=2��f�@�U���+Y>Qh��9���{��&�����r� ��A�              x�32�4�46�22�\Ff ڒ+F��� >�     